#!/usr/bin/env bash
# Tags the published commit of main and creates its GitHub release from the CHANGELOG. The
# repository lets only an admin create v* tags, so this runs on your machine, not in the workflow.
set -euo pipefail
cd "$(dirname "$0")/.."

git fetch -q origin main
commit="$(git rev-parse origin/main)"
version="$(git show "${commit}:packages/frontier/package.json" |
  node -p "JSON.parse(require('fs').readFileSync(0)).version")"

# Fails when npm does not have the version, so nothing unpublished gets a release.
npm view "@rayscale/frontier@${version}" version --prefer-online > /dev/null

notes="$(git show "${commit}:packages/frontier/CHANGELOG.md" |
  awk -v heading="## ${version}" '$0 == heading { found = 1; next } /^## / { found = 0 } found')"
prerelease=false
[[ "${version}" == *-* ]] && prerelease=true

gh release create "v${version}" --target "${commit}" --title "v${version}" \
  --notes "${notes}" --prerelease="${prerelease}"
