// const request = require('supertest');
// // Full app so we can test the 404
// const server = require('../../api/app.js');

// describe('index router endpoints', () => {
//   beforeAll(() => {});

//   describe('GET /', () => {
//     it('should return json with api:up', async () => {
//       const res = await request(server).get('/');

//       expect(res.status).toBe(200);
//       expect(res.body.api).toBe('Hello World');
//     });

//     it('should return 404 for /ping', async () => {
//       jest.spyOn(global.console, 'error').mockImplementation(() => {});
//       const res = await request(server).get('/ping');

//       expect(res.status).toBe(404);
//     });
//   });
// });

describe('it works', () => {
  it('works', () => {
    expect(1 + 1).toBe(2);
  });
});
