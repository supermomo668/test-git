# Workflows

1. Issue resolver
  * create `.header.sh` locally to create encoded GitHub secret for your repository
  ```
  authority: app.khoj.dev
  accept: */*
  accept-language: en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7
  cookie: 
  ...
  ```
  # Encode headers to base64
  ENCODED_HEADERS=$(echo -n "$HEADERS" | base64 | tr -d '\n')

  echo "KHOJ_HEADERS_ENCODED=$ENCODED_HEADERS"  > .github/.secret
  ```
  which creates .github/.secret to be uploaded to GitHub
  
  