# URL Builder

## Installation

### Docker
* Install [docker][DOCKER-LINK] / [docker-compose][DOCKERCOMPOSE-LINK] / [node.js][NODEJS-LINK].
* Open your project directory in console/terminal
* Install node dependencies:
  ```bash
  $ npm install
  ```
* Init environment settings:
* Copy `.env.dist` => `.env`
* Edit `.env` file manually (if needed)
* Build application
  ```bash
  $ docker-compose up -d
  ```
  or for production server
  ```bash
  $ docker-compose -f docker-compose-prod.yml up -d
  ```
* To make sure the Back-end application is working:
  ```bash
  $ docker-compose logs -f app
  ```
  Last row should be: `Nest application successfully started`
   
### Development Urls
* http://localhost:8080 - Backend URL
* http://localhost:33060 - DB address
* http://localhost:3001 - PhpMyAdmin

### Default user
* login: `linkmaker`
* password: `linkmaker`

## Environments
* Database client settings
  * `MYSQL_HOST` - mysql server host
  * `MYSQL_PORT` - mysql server port
  * `MYSQL_DATABASE` - mysql database name
  * `MYSQL_USER` - mysql connection user
  * `MYSQL_PASSWORD` - mysql connection password
  * `MYSQL_ROOT_PASSWORD` - mysql root password (for admin routines)
  * `MYSQL_MIGRATIONS_ON_START` - run migrations on application startup
  * `MYSQL_DEBUG` - debug mode in app console output

## Console routines

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Database migrations

```bash
# run
$ npm run migrate:up

# revert
$ npm run migrate:down
```

[NODEJS-LINK]: https://nodejs.org/en/download/
[OPENAPI-LINK]: https://www.openapis.org/
[DOCKER-LINK]: https://docs.docker.com/install/
[DOCKERCOMPOSE-LINK]: https://docs.docker.com/compose/install/
[NODEJS-LINK]: https://nodejs.org
[NESTJS-LINK]: https://github.com/nestjs/nest
[CSV-LINK]: https://tools.ietf.org/html/rfc4180

[SOURCE-LINK]: https://gitlab.com/raugustinas/motorive/commits/master
[PIPELINE-BADGE-LINK]: https://gitlab.com/raugustinas/motorive/badges/master/pipeline.svg
[COVERAGE-BADGE-LINK]: https://gitlab.com/raugustinas/motorive/badges/master/coverage.svg


