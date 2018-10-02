# boilerplate-restify-for-rest-api

Boilerplate of Restify for REST API

## Required

- NodeJS installed
- Docker installed for MongoDB (You can use a local MongoDB instead. Up to you.)

## Set up mongodb

```bash
docker container run -d --rm --name mongo-docker -p 27018:27017 mongo:latest
```

If you'd like to store data, remove '--rm' option and add '--mount' option. Up to you.

## Let's begin

```bash
git clone https://github.com/keidrun/boilerplate-restify-for-rest-api.git
cd boilerplate-restify-for-rest-api
yarn install
yarn start
```

## API endpoints

|  Method  |     URI      |         Data          |
| -------- | ------------ | --------------------- |
|   POST   |  /users      | name,age,gender,email |
|   GET    |  /users      |           -           |
|   GET    |  /users/:id  |           -           |
|   PUT    |  /users/:id  | name,age,gender,email |
|  DELETE  |  /users/:id  |           -           |

## Test

```bash
$ curl -v -H "Accept:application/json" -H "Content-Type:application/json" -X POST -d '{"name":"Keid","age":30,"gender":"male","email":"keid@example.com"}' http://localhost:3000/users | jq
...
< HTTP/1.1 200 OK
...
{
  "status": "success",
  "data": {
    "_id": "5bb30edcd1b036e33f6a2e57",
    "name": "Keid",
    "age": 30,
    "gender": "male",
    "email": "keid@example.com",
    "__v": 0
  }
}
$ curl -v -H "Accept:application/json" -H "Content-Type:application/json" -X POST -d '{"name":"Tom","age":24,"gender":"male","email":"tom@example.com"}' http://localhost:3000/users | jq
...
< HTTP/1.1 200 OK
...
{
  "status": "success",
  "data": {
    "_id": "5bb30f70d1b036e33f6a2e58",
    "name": "Tom",
    "age": 24,
    "gender": "male",
    "email": "tom@example.com",
    "__v": 0
  }
}
$ curl -v -H "Accept:application/json" -H "Content-Type:application/json" -X POST -d '{"name":"Mary","age":32,"gender":"female","email":"mary@example.com"}' http://localhost:3000/users | jq
...
< HTTP/1.1 200 OK
...
{
  "status": "success",
  "data": {
    "_id": "5bb30f84d1b036e33f6a2e59",
    "name": "Mary",
    "age": 32,
    "gender": "female",
    "email": "mary@example.com",
    "__v": 0
  }
}
$ curl -v -H "Accept:application/json" http://localhost:3000/users | jq
...
< HTTP/1.1 200 OK
...
{
  "status": "success",
  "data": [
    {
      "_id": "5bb30edcd1b036e33f6a2e57",
      "name": "Keid",
      "age": 30,
      "gender": "male",
      "email": "keid@example.com",
      "__v": 0
    },
    {
      "_id": "5bb30f70d1b036e33f6a2e58",
      "name": "Tom",
      "age": 24,
      "gender": "male",
      "email": "tom@example.com",
      "__v": 0
    },
    {
      "_id": "5bb30f84d1b036e33f6a2e59",
      "name": "Mary",
      "age": 32,
      "gender": "female",
      "email": "mary@example.com",
      "__v": 0
    }
  ]
}
$ curl -v -H "Accept:application/json" http://localhost:3000/users/5bb30f70d1b036e33f6a2e58 | jq
...
< HTTP/1.1 200 OK
...
{
  "status": "success",
  "data": {
    "_id": "5bb30f70d1b036e33f6a2e58",
    "name": "Tom",
    "age": 24,
    "gender": "male",
    "email": "tom@example.com",
    "__v": 0
  }
}
$ curl -v -H "Accept:application/json" -H "Content-Type:application/json" -X PUT -d '{"name":"Amily","age":21,"gender":"female","email":"amily@example.com"}' http://localhost:3000/users/5bb30f70d1b036e33f6a2e58 | jq
...
< HTTP/1.1 200 OK
...
{
  "status": "success",
  "data": {
    "_id": "5bb30f70d1b036e33f6a2e58",
    "name": "Amily",
    "age": 21,
    "gender": "female",
    "email": "amily@example.com",
    "__v": 0
  }
}
$ curl -v -H "Accept:application/json" -X DELETE http://localhost:3000/users/5bb30f84d1b036e33f6a2e59 | jq
...
< HTTP/1.1 200 OK
...
{
  "status": "success",
  "data": {
    "_id": "5bb30f84d1b036e33f6a2e59",
    "name": "Mary",
    "age": 32,
    "gender": "female",
    "email": "mary@example.com",
    "__v": 0
  }
}
$ curl -v -H "Accept:application/json" http://localhost:3000/users | jq
...
< HTTP/1.1 200 OK
...
{
  "status": "success",
  "data": [
    {
      "_id": "5bb30edcd1b036e33f6a2e57",
      "name": "Keid",
      "age": 30,
      "gender": "male",
      "email": "keid@example.com",
      "__v": 0
    },
    {
      "_id": "5bb30f70d1b036e33f6a2e58",
      "name": "Amily",
      "age": 21,
      "gender": "female",
      "email": "amily@example.com",
      "__v": 0
    }
  ]
}
```
