const execa = require('execa');
var util = require('util');

const SERVER_HOST = process.env.SERVER_HOST ? process.env.SERVER_HOST : "locahost"
const SERVER_PORT = process.env.SERVER_PORT ? process.env.SERVER_PORT : "8080"
const serverUrl = util.format('http://%s:%s/', SERVER_HOST, SERVER_PORT)

describe('rate limiter server', () => {
  // note: this will only succeed once in the 15min window designated
  test('expects GET / to return "Success"', async () => {
    const { stdout } = await execa('ab', [
      '-n',
      '200',
      '-v',
      '3',
      serverUrl,
    ]);

    // expect only 100 successful responses
    const matches = stdout.match(/RESPONSE_SUCCESS/g);
    if (matches) {
      expect(matches.length).toEqual(100);
    }
  });

  test('expects rate limit response after too many requests', async () => {
    const { stdout } = await execa('ab', [
      '-n',
      '1',
      '-v',
      '3',
      serverUrl,
    ]);

    expect(
      /Too many requests, please try again later./g.test(stdout),
    ).toBeTruthy();
  });
});
