# Rate Limiting Express w/ a Redis store

# Resources

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

## Dockerized verison

* Run the following container to get all at once...

```
$ docker-compose up --build
Building server
Step 1/8 : FROM node:14.11.0-buster-slim
 ---> bae31031f98e
Step 2/8 : RUN apt-get update && apt-get install -y apache2-utils
 ---> Using cache
 ---> 411395e231b3
Step 3/8 : WORKDIR /app
 ---> Using cache
 ---> cffce3bd5aaf
Step 4/8 : COPY package.json .
 ---> Using cache
 ---> c09bfdf87871
Step 5/8 : RUN yarn install
 ---> Using cache
 ---> a7c082ca68c2
Step 6/8 : COPY index.js .
 ---> Using cache
 ---> 666473275621
Step 7/8 : COPY __tests__ .
 ---> Using cache
 ---> 8986db312489
Step 8/8 : CMD ["yarn", "start"]
 ---> Using cache
 ---> e626abe69316

Successfully built e626abe69316
Successfully tagged marcellodesales/rate-limiting-server-redis-client:latest
Building tester
Step 1/8 : FROM node:14.11.0-buster-slim
 ---> bae31031f98e
Step 2/8 : RUN apt-get update && apt-get install -y apache2-utils
 ---> Using cache
 ---> 411395e231b3
Step 3/8 : WORKDIR /app
 ---> Using cache
 ---> cffce3bd5aaf
Step 4/8 : COPY package.json .
 ---> Using cache
 ---> c09bfdf87871
Step 5/8 : RUN yarn install
 ---> Using cache
 ---> a7c082ca68c2
Step 6/8 : COPY index.js .
 ---> Using cache
 ---> 666473275621
Step 7/8 : COPY __tests__ .
 ---> Using cache
 ---> 8986db312489
Step 8/8 : CMD ["yarn", "start"]
 ---> Using cache
 ---> e626abe69316

Successfully built e626abe69316
Successfully tagged marcellodesales/rate-limiting-server-redis-client:latest
Starting express-redis-rate-limiting_server_1   ... done
Starting express-redis-rate-limiting_redis_1    ... done
Starting express-redis-rate-limiting_tester_1   ... done
Creating express-redis-rate-limiting_redis_ui_1 ... done
Attaching to express-redis-rate-limiting_server_1, express-redis-rate-limiting_redis_1, express-redis-rate-limiting_tester_1, express-redis-rate-limiting_redis_ui_1
redis_1     | 1:C 29 Sep 2020 05:08:49.917 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
redis_1     | 1:C 29 Sep 2020 05:08:49.917 # Redis version=6.0.8, bits=64, commit=00000000, modified=0, pid=1, just started
redis_1     | 1:C 29 Sep 2020 05:08:49.917 # Configuration loaded
redis_1     | 1:M 29 Sep 2020 05:08:49.918 * Running mode=standalone, port=6379.
redis_1     | 1:M 29 Sep 2020 05:08:49.918 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
redis_1     | 1:M 29 Sep 2020 05:08:49.918 # Server initialized
redis_ui_1  | PHP 7.3.8 Development Server started at Tue Sep 29 05:08:49 2020
tester_1    | wait-for-it.sh: waiting 15 seconds for server:8000
redis_1     | 1:M 29 Sep 2020 05:08:49.993 * DB loaded from append only file: 0.074 seconds
redis_1     | 1:M 29 Sep 2020 05:08:49.993 * Ready to accept connections
server_1    | yarn run v1.22.5
server_1    | $ node index.js
server_1    | Server started
tester_1    | wait-for-it.sh: server:8000 is available after 1 seconds
tester_1    | yarn run v1.22.5
tester_1    | $ jest
tester_1    | PASS ./index.test.js
tester_1    |   rate limiter server
tester_1    |     ✓ expects GET / to return "Success" (269 ms)
tester_1    |     ✓ expects rate limit response after too many requests (16 ms)
tester_1    |
tester_1    | Test Suites: 1 passed, 1 total
tester_1    | Tests:       2 passed, 2 total
tester_1    | Snapshots:   0 total
tester_1    | Time:        1.559 s
tester_1    | Ran all test suites.
tester_1    | Done in 2.33s.
tester_1    | wait-for-it.sh: waiting 15 seconds for server:8000
tester_1    | wait-for-it.sh: server:8000 is available after 0 seconds
tester_1    | yarn run v1.22.5
tester_1    | $ jest
tester_1    | PASS ./index.test.js
tester_1    |   rate limiter server
tester_1    |     ✓ expects GET / to return "Success" (227 ms)
tester_1    |     ✓ expects rate limit response after too many requests (17 ms)
tester_1    |
tester_1    | Test Suites: 1 passed, 1 total
tester_1    | Tests:       2 passed, 2 total
tester_1    | Snapshots:   0 total
tester_1    | Time:        1.569 s
tester_1    | Ran all test suites.
tester_1    | Done in 2.34s.
```

* You can view the current state of Redis either by inspecting the aof file under `./redis-data`
* You can also view the current state at the Redis UI at http://localhost:8080

<img width="578" alt="Screen Shot 2020-09-29 at 2 15 23 AM" src="https://user-images.githubusercontent.com/131457/94517659-c7c79980-01fe-11eb-8282-3c79cecd321b.png">
