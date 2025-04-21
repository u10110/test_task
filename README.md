# This is a test task implementation

RESTfull API example of some shop with auth and products CRUD.

Auth impl with json token, session store in it and encrypted with SECRET from .env

## Used libraries

Server - https://expressjs.com/
Auth - https://www.npmjs.com/package/jsonwebtoken
ORM - https://www.prisma.io/docs/getting-started
swagger ID - https://www.npmjs.com/package/swagger-ui-express
swagger doc generated with - https://www.npmjs.com/package/swagger-jsdoc
Tests - https://www.npmjs.com/package/supertest

Also added docker-compose.yml  
local run with -  docker-compose up -d

Tests cover all routes with data changes check


For local run first install npm packages
  - npm i

Create DB artifacts 
  - npm run generate

Upd local .env with your connection parameters and run migrations
 - npm run migrate

Seed DB with default user
 - npm run seed

Start dev server
 - npm run build

Default SERVER_PORT is 8080 (set in .env)  must be changed  in docker-compose.yml  too

Tests run with command
 - npm run test






