const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://localhost/linkin-db'
});

client.connect();
module.exports = client;
