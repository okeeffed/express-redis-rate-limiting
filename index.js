const express = require('express');
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const app = express();
const port = process.env.SERVER_PORT ? process.env.SERVER_PORT : 8080;

const limiter = rateLimit({
  store: new RedisStore({
    expiry: 60 * 15,
    client: require('redis').createClient({
        host: process.env.REDIS_HOST, // The hostname of the database you are connecting to.
        port: process.env.REDIS_PORT, // The port number to connect to.
     // password: 'redispassword', // The password for redis database.
    }),
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes - only used for MemoryStore, ignored with RedisStore
  max: 100, // limit each IP to 100 requests per windowMs
});

// use limiter in the middleware
app.use(limiter);

//
app.get('/', (_, res) => res.send('RESPONSE_SUCCESS'));

app.listen(port, () => console.log('Server started'));
