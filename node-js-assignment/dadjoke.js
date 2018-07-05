const axios = require('axios');
const fs = require('fs');

function prompt(question, callback) {
  var stdin = process.stdin,
    stdout = process.stdout;

  stdin.resume();
  stdout.write(question);

  stdin.once('data', function(data) {
    callback(data.toString().trim());
  });
}

prompt('Please enter a search term: ', function(input) {
  getJoke(input);
  setTimeout(() => {
    process.exit();
  }, 1000);
});

function getJoke(term) {
  axios
    .get(`https://icanhazdadjoke.com/search?term=${term}`, {
      headers: { Accept: 'application/json' }
    })
    .then(res => {
      if (res.data.results.length > 0) {
        let x = Math.floor(Math.random() * res.data.results.length + 1) - 1;
        fs.appendFile('jokes.txt', `${res.data.results[x].joke}\n`, function(
          err
        ) {
          if (err) throw err;
          console.log('Saved!');
        });
      } else {
        console.log(`Uh oh! No jokes were found.`);
      }
    })
    .catch(err => console.log(err));
}
