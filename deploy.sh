#!/bin/bash
# Rename problematic files before deploy
find . -name "mutations*" -type f ! -path "./convex/*" -delete
find . -name "queries*" -type f ! -path "./convex/*" -delete
npx convex deploy --yes