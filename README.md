<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

### Make sure you have docker and docker-compose installed

## Installation

```bash
$ yarn install
```

## Running the app

```bash
$ docker network create local-network-dreamlabs
$ docker compose up
```

This is a basic set up, not a lot of abstractions as I belive that you should only start 
abstracting when you get to a certain level of complexity.

For a real project where there are more than one service, it would be more clear how to abstract.

we can brainstorm while we review this repo in a meeting.
