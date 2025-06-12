# retailstore

Testing the OAuth2 API
curl -X POST http://localhost:3000/oauth/token \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "grant_type=password&username=presales1&password=demo123&client_id=presales1&client_secret=presales1secret"

curl -X GET http://localhost:3000/secure \
-H "Authorization: Bearer 5331e07ce109ecdfe2dc1b943d92d0f041c44975"

