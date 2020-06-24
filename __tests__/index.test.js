const execa = require('execa');

describe('rate limiter server', () => {
  // note: this will only succeed once in the 15min window designated
  test('expects GET / to return "Success"', async () => {
    const { stdout } = await execa('ab', [
      '-n',
      '200',
      '-v',
      '3',
      'http://localhost:8080/',
    ]);

    // expect only 100 successful responses
    const matches = stdout.match(/RESPONSE_SUCCESS/g);
    expect(matches.length).toEqual(100);
  });

  test('expects rate limit response after too many requests', async () => {
    const { stdout } = await execa('ab', [
      '-n',
      '1',
      '-v',
      '3',
      'http://localhost:8080/',
    ]);

    expect(
      /Too many requests, please try again later./g.test(stdout),
    ).toBeTruthy();
  });
});
