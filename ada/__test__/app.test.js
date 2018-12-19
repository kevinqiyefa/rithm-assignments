const request = require('supertest');
const fs = require('fs');
const app = require('../app');

beforeAll(() => {
  const DEFAULT_DATABASE_STATE = {
    '5432': [
      {
        sender: 'anson',
        message: "I'm a teapot",
        created: '2018-01-17T04:50:14.883Z'
      }
    ]
  };

  fs.writeFile(
    './__test__/test_database.json',
    JSON.stringify(DEFAULT_DATABASE_STATE),
    err => {
      if (err) console.log(err);
    }
  );
});

describe("GET /conversations/:conversationId' ", () => {
  test('It should respond with the json object', async () => {
    const response = await request(app).get('/conversations/5432');
    expect(response.body).toEqual({
      id: '5432',
      message: [
        {
          created: '2018-01-17T04:50:14.883Z',
          message: "I'm a teapot",
          sender: 'anson'
        }
      ]
    });
    expect(response.statusCode).toBe(200);
  });
});

describe("Post /messages' ", () => {
  test('It should respond with the the input', async () => {
    const response = await request(app)
      .post('/messages')
      .send({
        sender: 'kevin',
        conversation_id: '124',
        message: "I'm a teapot"
      });
    expect(response.body).toEqual({
      sender: 'kevin',
      conversation_id: '124',
      message: "I'm a teapot"
    });
    expect(response.statusCode).toBe(200);
  });
});

afterAll(() => {
  fs.writeFile('./__test__/test_database.json', JSON.stringify({}), err => {
    if (err) console.log(err);
  });
});
