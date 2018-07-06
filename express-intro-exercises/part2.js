const express = require('express');
const bodyParser = require('body-parser');

const shoppinglistRoutes = require('./routes/shoppinglist');
const app = express();

app.use(bodyParser.json());

app.use('/items', shoppinglistRoutes);

app.listen(3000, function() {
  console.log('Server starting');
});
