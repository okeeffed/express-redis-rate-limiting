# Rate Limiting Express w/ a Redis store

## Resources

1. [rate-limit-redis](https://github.com/wyattjoh/rate-limit-redis)
2. [express-rate-limit](https://github.com/nfriedly/express-rate-limit)
3. [Redis commands](https://redis.io/commands)
4. [DockerHub - Redis](https://hub.docker.com/_/redis)
5. [Express.js](https://expressjs.com/)

## Setup

```s
yarn setup
# start Docker container
yarn redis:start
# start app
yarn start
```

## Connecting to Redis CLI

```s
yarn redis:cli
```

## Checking the rate limiting

```s
yarn test
```

## Locally

If limited, expects `Too many requests, please try again later.`.

if successful, expects `RESPONSE_SUCCESS`.
