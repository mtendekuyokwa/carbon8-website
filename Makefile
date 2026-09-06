.PHONY: setup dev check test e2e check-arch vcr verify-feature clean-check session-start session-end

setup:
	npm ci

dev:
	npm run dev

check:
	npm run lint && npm run typecheck && npm test && npm run build

test:
	npm test

e2e:
	bash scripts/e2e-smoke.sh

check-arch:
	bash scripts/check-arch.sh

vcr:
	bash scripts/vcr.sh

verify-feature:
	bash scripts/verify-feature.sh $(F)

clean-check:
	bash scripts/clean-state-check.sh .

session-start:
	bash scripts/session-trace.sh start "$(MSG)"

session-end:
	bash scripts/session-trace.sh end "$(MSG)"
