# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Running application

Clone repository

```
git clone https://github.com/VyacheslavMusiienko/nodejs2023Q2-service.git
```

```
cd ./nodejs2023Q2-service
```

```
git checkout dev-v2
```

## Installing NPM modules

```
npm install
```

## Create .env file (based on .env.example)
and you can change port number in .env file

```
cp .env.example .env
```
## Running application

- Create .env file (based on .env.example) in copied folder: ./.env
- Run next command in your terminal, for building images and docker containers up:

```
docker-compose up
```

After docker compose command complete and dockers starting you can open in your browser OpenAPI documentation by typing http://localhost:4000/doc/ (port 4000 as default) and execute test queries.

After application running open new terminal and enter:

```
npm run test
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc (only developer mode).

You can download OpenAPI Specification in JSON or YAML format  by typing http://localhost:4000/docs-json
or http://localhost:4000/docs-yaml (only developer mode)

**You will check OpenAPI spec in doc folder corresponds with assignment**

For more information about OpenAPI/Swagger please visit https://swagger.io/.