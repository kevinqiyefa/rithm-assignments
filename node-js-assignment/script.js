const fs = require('fs');
const data = require('./data');
const citys = new Set(['California', 'Washington', 'Oregon']);
const office_citys = new Set(['San Francisco', 'Seattle', 'Portland']);

if (fs.existsSync('potentials.txt')) {
  fs.unlink('potentials.txt', function(error) {
    if (error) {
      throw error;
    }
  });
}

for (let p of data) {
  if (citys.has(p.city)) {
    let info = `Name: ${p.firstName} ${p.lastName},  Email: ${
      p.email
    }, Campany: ${p.company}\n`;
    fs.appendFile(`potentials.txt`, info, function(err) {
      if (err) throw err;
    });
  } else if (office_citys.has(p.city) && p.company) {
    let email = `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Page Title</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body style='background-color: whitesmoke'>
      <div style='margin: 10em 15em; border: 2px solid black; padding: 0.8em; font-size: 1.2em'>
        <div>Hello ${p.firstName}, </div>
        <br>
        <br>
        <div>I saw your experience at ${
          p.company
        } and thought you would be a great fit for us here at LinkedList. Let me know if you're interested in getting coffee or whatever recruiters say... </div>
        <br>
        <br>
        <div>Best,</div>
        <br>
        <div>Randy Random</div>
        <div>LinkedList</div>
      </div>
    </body>
    </html>`;

    fs.writeFile(`${p.email}.html`, email, function(err) {
      if (err) throw err;
    });
  }
}
