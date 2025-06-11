# retailstore

Testing the OAuth2 API
curl -X POST http://34.123.45.67:3000/oauth/token -d 'grant_type=password&username=test&password=testpassword'
Access the /oauth/token endpoint to generate tokens:
Use Postman or curl to send a POST request.
Access the /oauth/validate endpoint to validate tokens:
Other microservices can call this endpoint for token validation.