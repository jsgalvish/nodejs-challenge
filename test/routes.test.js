const request = require('supertest');
const app = require('../src/server');

describe('Routes Testing', () => {
  beforeEach(() => {});

  it('Test Login (Good Credentials)', async () => {
    const res = await request(app)
      .post('/user/login')
      .send({
        username: 'sebastian',
        password: '[21)F3nr1r]',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user')
  });

  it('Test Login (Bad Credentials)', async () => {
    const res = await request(app)
      .post('/user/login')
      .send({
        username: 'sebastian',
        password: '[21)F3nr1r',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Wrong Credentials Are Wrong!')
  });

  it('Register (Duplicate User)', async () => {
    const res = await request(app)
      .post('/user/register')
      .send({
        username: 'sebastian',
        password: '[21)F3nr1r]',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('User Already Exists, Please Login!')
  });

  it('Get Messages (Alpha Room)', async () => {
    const res = await request(app)
      .get('/message/all')
      .send({
        room:'a'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('messages')
  })
});





