#!/bin/bash
cd /home/kavia/workspace/code-generation/animal-behavior-analytics-platform-40568-40577/frontend_react_js
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

