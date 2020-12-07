# Express JS Simple Voting System


## Start the project Script
```
1. docker-compose up -d
2. npm start
3. npm run test for test unit test
```
## Feature List
- Create Voting Campaign
```
curl --location --request POST 'http://localhost:3000/campaigns' \
--header 'Content-Type: application/json' \
--header 'Cookie: session=eyJ1c2VyIjp7Il9pZCI6IjVmY2RkMGIwZTk4Njg5ZjkzNDY3NzAxZCIsImhraWQiOiJQNjQzNzU0NCIsIl9fdiI6MH19; session.sig=hl01Vs3ciXl9fZM-fBp-bz2n1yE' \
--data-raw '{
    "name": "Who is the best NBA player in history",
    "startedAt": "2020-12-09",
    "endedAt": "2020-12-10",
    "candidates": [
        {
            "name": "Michael Jordan"
        },
        {
            "name": "Kobe Bryant"
        }
    ]
}'
```


- Create Voting
```
curl --location --request POST 'http://localhost:3000/campaigns/5fcdd8edcabeca3ef5c23f85/votes' \
--header 'Content-Type: application/json' \
--header 'Cookie: session=eyJ1c2VyIjp7Il9pZCI6IjVmY2RkMGIwZTk4Njg5ZjkzNDY3NzAxZCIsImhraWQiOiJQNjQzNzU0NCIsIl9fdiI6MH19; session.sig=hl01Vs3ciXl9fZM-fBp-bz2n1yE' \
--data-raw '{
    "hkid": "A123456",
    "candidate": "5fcdcf8a21268d3900f3b3f9"
}'
```

- View One Campaign
```
curl --location --request GET 'http://localhost:3000/campaigns/5fcdcf8a21268d3900f3b3fa' \
--header 'Cookie: session=eyJ1c2VyIjp7Il9pZCI6IjVmY2RkMGIwZTk4Njg5ZjkzNDY3NzAxZCIsImhraWQiOiJQNjQzNzU0NCIsIl9fdiI6MH19; session.sig=hl01Vs3ciXl9fZM-fBp-bz2n1yE'
```

- View All Campaigns
```
curl --location --request GET 'http://localhost:3000/campaigns' \
--header 'Cookie: session=eyJ1c2VyIjp7Il9pZCI6IjVmY2RkMGIwZTk4Njg5ZjkzNDY3NzAxZCIsImhraWQiOiJQNjQzNzU0NCIsIl9fdiI6MH19; session.sig=hl01Vs3ciXl9fZM-fBp-bz2n1yE'
```

## Tech Stack
- ExpressJS
- Winston
- MongoDB
- Jest
