#!/bin/bash
echo "running entrypoint.................................."
npm install
npx puppeteer browsers install chrome
npm run build
npm run dev