from pickle import TRUE
import sys
import traceback
import json
import requests

import base64

DEBUG=TRUE
if DEBUG:
  print(f"Arguments: {sys.argv}")
  
base_url = sys.argv[1]
query_param  = sys.argv[2]
issue_query = sys.argv[3]
if len(sys.argv) < 5:
  decoded_headers = ""  
else:
  decoded_headers = base64.b64decode(sys.argv[4]).decode('utf-8')



def form_response(response_json):
  if 'response' not in response_json:
    return response_json.get('detail', "The service is unavailable.").replace('khoj', 'FDAi agent service')
  return f"{response_json['response']}\nContext:" \
    + "\n".join(response_json['context'])

# Extract arguments
def main():
  try:
    # Convert the list into a dictionary or use it directly, depending on your request method
    headers_dict = {
      k: v for k, v in (
        line.split(': ', 1) for line in  decoded_headers.split('\n') if line
        )
    }
    # Make the GET request
    response = requests.get(
      f"{base_url}{query_param}{issue_query}", headers=headers_dict
    )
    # Print the response (or handle it as needed)
    return form_response(response.json())
  except Exception as e:
    print(f"Error ecountered when sending GET request:\n{e}")
    print(f"Traceback:\n{traceback.print_exc() }")
    
print(main())
