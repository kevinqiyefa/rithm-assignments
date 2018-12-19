const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let DATA_PATH = './data.json';

//create a testing database

if (process.env.NODE_ENV === 'test') {
  DATA_PATH = './__test__/test_database.json';
}

app.post('/messages', (req, res, next) => {
  const requiredFields = { conversation_id: 0, sender: 0, message: 0 };
  let id, sender, message;

  //input custom validation
  for (let key in req.body) {
    if (!(key in requiredFields)) {
      const notFoundErr = new Error(`Please double check your input`);
      notFoundErr.status = 400;
      return next(notFoundErr);
    }
  }

  id = req.body.conversation_id;
  sender = req.body.sender;
  message = req.body.message;

  fs.readFile(DATA_PATH, function(err, data) {
    if (err) {
      return next(err);
    }
    data = JSON.parse(data);

    if (data[id]) {
      data[id].push({
        sender,
        message,
        created: new Date()
      });
    } else {
      data[id] = [
        {
          sender,
          message,
          created: new Date()
        }
      ];
    }

    fs.writeFile(DATA_PATH, JSON.stringify(data), function(err) {
      if (err) return next(err);
      return res.json(req.body);
    });
  });
});

app.get('/conversations/:conversationId', (req, res, next) => {
  const id = req.params.conversationId;
  fs.readFile(DATA_PATH, function(err, data) {
    if (err) {
      return next(err);
    }
    data = JSON.parse(data);

    if (data[id]) {
      data = {
        id,
        message: data[id]
      };
    } else {
      const notFoundErr = new Error(
        `No conversation with ID of '${id}' found.`
      );
      notFoundErr.status = 404;
      return next(notFoundErr);
    }
    return res.json(data);
  });
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  return next(err); // pass the error to the next piece of middleware
});
/* 
  error handler - for a handler with four parameters, 
  the first is assumed to be an error passed by another
  handler's "next"
 */

app.use((err, req, res, next) => {
  return res
    .status(err.status || 500) // set the response status if specified or default to 500
    .json({ error: err.message || 'Internal Server Error.' }); // send a JSON object with an error key
});

module.exports = app;
