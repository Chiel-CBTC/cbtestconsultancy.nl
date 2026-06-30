#!/usr/bin/env bash
set -e

echo "Building site..."
npm run build

echo "Build complete. Contents of out/:"
ls out/

echo ""
echo "Upload the contents of out/ to your host's public_html (or www) directory."
echo "Example with rsync (replace USER, HOST, PATH):"
echo ""
echo "  rsync -avz --delete out/ USER@HOST:/path/to/public_html/"
echo ""
echo "Example with FTP: use your host's file manager or FileZilla."
