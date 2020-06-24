const express = require('express');
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const app = express();
const port = 8080;

const limiter = rateLimit({
  store: new RedisStore({
    expiry: 60 * 15,
    client: require('redis').createClient({
      // Exposing Docker port on 6000
      port: 6000,
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
