# A simple REST API using hapi framework

https://github.com/brewglvn/restapi-hapiframework

## Installation and Running the App

1. Install mongodb
2. Run mongo server
3. Clone the repo, then: 

```bash
npm install
node server.js
```

The app will be served at `localhost:5000`.

## Available Routes

#### **POST** `/api/users`
* Accepts `username`, and `password`, and `adminkey` to create a user. Returns a JWT.

#### **POST** `/api/users/authenticate`
* Accepts `username` and `password` to authenticate a user. Returns a JWT.

#### **GET** `/api/users`
* Returns all users in the database. Requires `admin` scope.

#### **POST** `/api/user/{id}`
* Updates a user. Requires `admin` scope.

#### **POST** `/api/user/del/{id}`
* Delete a user. Requires `admin` scope.

...........................
contin......
...........................