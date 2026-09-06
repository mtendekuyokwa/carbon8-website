# Constraints

Project rules for the Carbon8 website. These are **rules, not guidelines** — violations are treated as bugs.
They supplement `DESIGN.md` (brand system) and `FOLDER_STRUCTURE.md` (Bulletproof React layout).

## 1. Rules of React (enforced)

Follow the [Rules of React](https://react.dev/reference/rules):

### 1.1 Components and Hooks must be pure
- Components are idempotent: same props/state/context → same output.
- No side effects during render. No `localStorage`, `matchMedia`, `fetch`, subscriptions, or DOM mutation in render or in state updaters. Use `useEffect`, `useLayoutEffect`, or event handlers.
- State updaters (`setState(prev => next)`) must be pure — compute `next` only, never write to storage/network/refs inside.
- Never mutate props, state, or values passed to Hooks/JSX. Copy first (`{...}`, `[...]`).

### 1.2 React calls Components and Hooks
- Components are used as JSX (`<Foo />`), never called as plain functions (`Foo()`).
- Hooks are called only inside React components or custom Hooks. Never pass a Hook itself as a value.

### 1.3 Rules of Hooks
- Call Hooks unconditionally at the top level — never in loops, conditions, or nested functions, and never after an early return.
- Call Hooks only from React functions (components or `use*` Hooks).
- `useSyncExternalStore` requires referentially stable `subscribe`/`getSnapshot` (memoize with `useCallback` keyed on inputs).

## 2. Project-specific hook contracts (`app/hooks/`)
- `useLocalStorage`: persist via `useEffect`, never inside the state updater (updater stays pure). Guard all `window` access for SSR.
- `useMediaQuery`: memoize `subscribe`/`getSnapshot` per query; server snapshot is module-scope `() => false`.
- `useClickOutside`: latest `handler` is mirrored in a ref so the effect subscribes once per `ref`. Callers do not need `useCallback`, but it is still recommended.
- `usePrevious`: the single sanctioned render-time `ref.current` read. Write happens only in `useEffect`. The targeted `eslint-disable react-hooks/refs` with justification comment is allowed here and nowhere else.
- `useIntersectionObserver`: serialize array `threshold` for the dep array to avoid observer churn. Return shape `[ref, entry]` is stable API. The targeted `eslint-disable react-hooks/exhaustive-deps` on the `thresholdKey` dep (with justification) is allowed here.

## 3. Enforcement
- `app/root.tsx` renders inside `React.StrictMode` so purity violations surface in dev (double render).
- ESLint `eslint-plugin-react-hooks` `recommended-latest` is authoritative: `npm run lint` must pass with no `react-hooks/*` disables except the two documented cases below (`usePrevious` render-time read, `useIntersectionObserver` threshold-key).
- Verification for any change touching components/hooks:
  1. `npm run lint`
  2. `npm run typecheck` (`react-router typegen && tsc`)
  3. `npm test` (covers `app/hooks/__tests__/`)
