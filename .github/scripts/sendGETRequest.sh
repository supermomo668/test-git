#!/bin/bash
# Extract environment variables passed from the workflow
BASE_URL=$1
QUERY_PARAMS=$2
HEADERS_SECRET=$3

# Decode the encoded headers secret to get the headers array
HEADERS_JSON=$(echo -n ${{ secrets.KHOJ_HEADERS_ENCODED }} | base64 --decode)
# read into array
readarray -t HEADERS <<< "$(jq -r '.[]' <<< "$HEADERS_JSON")"

# Make the curl request
RESPONSE=$(curl -s -X GET "${BASE_URL}${QUERY_PARAMS}")
echo $RESPONSE
# Format the response to be script safe and store it in an environment variable for the workflow
if echo "$RESPONSE" | jq -e '.response' > /dev/null; then
  FORMATTED_RESPONSE=$(echo $RESPONSE | jq -r '"\(.response)\nContext:\n\(.context | join("\n"))"')
else
  FORMATTED_RESPONSE="I apologize, the agent is not available at the moment or host server is being rate-limited."
fi

# Output the formatted response so it can be captured by the calling workflow
echo "$FORMATTED_RESPONSE"
