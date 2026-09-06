---
description: Verify a feature through its harness layers and gate pass state.
agent: build
---

The feature ID is $ARGUMENTS (e.g. `F01-home`). Never edit `feature_list.json` state by hand.

1. Read the entry for `$ARGUMENTS` in `feature_list.json` (behavior, layers with repair).
2. Run `make verify-feature F=$ARGUMENTS` — layers execute in order; on failure print the layer's repair text.
3. On success confirm `state=passing` with `evidence` stamped. On failure stop and fix before retrying.
