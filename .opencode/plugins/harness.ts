import type { Plugin } from "@opencode-ai/plugin"

// Harness plugin: enforces the repo's agent workflow automatically.
// - session.created → records a clock-in trace event (.harness/traces/traces.jsonl)
// - tool.execute.before → blocks direct edits that write "passing" into
//   feature_list.json (pass state is harness-gated: `make verify-feature F=<id>`)
// - experimental.session.compacting → keeps harness pointers across compaction
export const HarnessPlugin: Plugin = async ({ $, directory }) => {
  const trace = async (kind: string, msg: string) => {
    try {
      await $`bash scripts/session-trace.sh ${kind} ${msg}`.cwd(directory);
    } catch {
      // Tracing must never break a session.
    }
  };

  return {
    event: async ({ event }) => {
      if (event.type === "session.created") {
        await trace("start", "session created");
      }
    },

    "tool.execute.before": async (input, output) => {
      if (input.tool !== "edit" && input.tool !== "write") return;
      const fp = String(output.args?.filePath ?? output.args?.path ?? "");
      if (!fp.endsWith("feature_list.json")) return;
      if (JSON.stringify(output.args ?? {}).includes("passing")) {
        throw new Error(
          'Blocked by harness plugin: never set feature_list.json state to "passing" by hand. ' +
            "Set state=active, do the work, then run `make verify-feature F=<id>` — " +
            "the harness stamps passing + evidence."
        );
      }
    },

    "experimental.session.compacting": async (_input, output) => {
      output.context.push(
        "Harness pointers (carbon8-website): protocol in AGENTS.md; progress in PROGRESS.md; " +
          "one active feature at a time in feature_list.json (WIP=1); verify with `make check`; " +
          "never hand-edit state to passing (use `make verify-feature F=<id>`)."
      );
    },
  };
};
