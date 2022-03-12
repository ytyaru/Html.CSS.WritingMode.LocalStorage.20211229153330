#!/bin/bash
python3 -m http.server 8000 &
sleep 1
URL=http://0.0.0.0:8000/
echo "$URL" | xsel -bi 
chromium-browser "$URL"
