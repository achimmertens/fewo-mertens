#!/usr/bin/env bash
# SEO & Build Test Suite for Ferienwohnung Waldoase Mertens
#
# Usage:
#   bash tests/run-seo-tests.sh          # build + test
#   bash tests/run-seo-tests.sh --skip-build  # test existing dist/ only
#
# Exit code:
#   0 = all passed
#   1 = build failed
#   2 = at least one SEO check failed

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DIST_DIR="$PROJECT_DIR/dist"
ERRORS=0

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================"
echo "  SEO & Build Test Suite"
echo "  Projekt: Ferienwohnung Waldoase Mertens"
echo "========================================"
echo ""

# ---- Step 1: Build ----
if [[ "${1:-}" != "--skip-build" ]]; then
  echo "  [1/4] Build wird ausgefuehrt ..."
  cd "$PROJECT_DIR"
  if npm run build 2>&1; then
    echo -e "  ${GREEN}==> BUILD OK${NC}"
    echo ""
  else
    echo -e "  ${RED}==> BUILD FEHLGESCHLAGEN${NC}"
    exit 1
  fi
else
  echo "  [1/4] Build uebersprungen (--skip-build)"
  echo ""
fi

# ---- Step 2: Pruefe ob dist/ existiert ----
echo "  [2/4] Pruefe dist/ Verzeichnis ..."
if [ ! -d "$DIST_DIR" ]; then
  echo -e "  ${RED}==> dist/ existiert nicht. Fuehre zuerst 'npm run build' aus.${NC}"
  exit 1
fi

# ---- Step 3: SEO-Tag-Pruefungen ----
echo "  [3/4] SEO-Tag Pruefungen ..."

# Finde die HTML-Datei(en) im dist/
HTML_FILE=$(find "$DIST_DIR" -maxdepth 2 -name "index.html" | head -1)
if [ -z "$HTML_FILE" ]; then
  echo -e "  ${RED}==> Keine index.html in dist/ gefunden${NC}"
  ERRORS=$((ERRORS+1))
else
  HTML_CONTENT=$(cat "$HTML_FILE")

  # Helper: check if tag exists
  check_tag() {
    local label="$1"
    local pattern="$2"
    if echo "$HTML_CONTENT" | grep -q "$pattern"; then
      echo -e "  ${GREEN}  [OK]${NC} $label"
    else
      echo -e "  ${RED}  [FAIL]${NC} $label"
      ERRORS=$((ERRORS+1))
    fi
  }

  check_tag "Title-Tag existiert" '<title>'
  check_tag "Meta Description" 'name="description"'
  check_tag "Meta Robots (index, follow)" 'name="robots".*content="index, follow"'
  check_tag "Canonical URL" 'rel="canonical"'
  check_tag "Favicon" 'rel="icon"'
  check_tag "Open Graph: Title" 'property="og:title"'
  check_tag "Open Graph: Description" 'property="og:description"'
  check_tag "Open Graph: Type" 'property="og:type"'
  check_tag "Open Graph: URL" 'property="og:url"'
  check_tag "Open Graph: Site Name" 'property="og:site_name"'
  check_tag "Open Graph: Image" 'property="og:image"'
  check_tag "Twitter Card" 'name="twitter:card"'
  check_tag "Twitter Title" 'name="twitter:title"'
  check_tag "Keywords" 'name="keywords"'
  check_tag "JSON-LD Structured Data" 'application/ld+json'
  check_tag "Schema: LodgingBusiness" '"@type": "LodgingBusiness"'
  check_tag "Schema: Address" 'PostalAddress'
  check_tag "Schema: Telefon" 'telephone'
  check_tag "Schema: Email" 'email'
  check_tag "Google Analytics/Ads" 'googletagmanager'
fi

# ---- Step 4: Zusammenfassung ----
echo ""
echo "  [4/4] Zusammenfassung ..."
rc=0
if [ "$ERRORS" -eq 0 ]; then
  echo -e "  ${GREEN}==> ALLE TESTS BESTANDEN${NC}"
else
  echo -e "  ${RED}==> $ERRORS Test(s) fehlgeschlagen${NC}"
  rc=2
fi

echo ""
echo "========================================"
exit $rc
