# pangram-restful-service

## Description
This application exposes a RESTful service which given a string (may contain non-alpha characters) will return whether 
or not the phrase / string is a Pangram. A pangram is defined as a sentence or phrase that contains all the letters of the alphabet. 

## Installation

    npm install
    
## Run

    npm start
    
## Test
To test this application, make sure you have the application running, then run the following.
    
    npm test
    
## Example
You can invoke a deployed version of the service at the following url. 

    https://vast-harbor-20220.herokuapp.com/rest/pangram
    
Example POST payload (application/json).

    {
        "phrase": "aAAAAADbbcdefghijklmqnopXrstuvwxyz123456!@#$%^&*()abcdefg"
    }
    
Example response (application/json).

    {
        "phrase": "aAAAAADbbcdefghijklmqnopXrstuvwxyz123456!@#$%^&*()abcdefg",
        "isPangram": true
    }
    
If a phrase is not provided or is missing in the request, the service will respond with the following.

    {
        "errorMessage": "Error: phrase is required."
    }
