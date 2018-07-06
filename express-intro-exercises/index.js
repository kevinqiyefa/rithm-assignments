const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', function(request, response) {
  return response.send('Hello World!!!!');
});

app.get('/mean', function(request, response, next) {
  let nums = request.query.nums;

  if (!nums) return next(new Error(`nums are required.`));

  let numsArr = nums.split(',');

  for (let i of numsArr) {
    let newError = `'${i}' is not a number.`;
    if (isNaN(i)) return next(new Error(newError));
  }

  let mean = findmean(numsArr.map(x => Number(x.trim())));
  let data = `The mean of ${nums} is ${mean}\n`;
  if (request.query.save === undefined || request.query.save === 'true') {
    appendToFile(data);
  }
  return response.send(data);
});

app.get('/median', function(request, response, next) {
  let nums = request.query.nums;

  if (!nums) return next(new Error(`nums are required.`));

  let numsArr = nums.split(',');
  for (let i of numsArr) {
    let newError = `'${i}' is not a number.`;
    if (isNaN(i)) return next(new Error(newError));
  }
  let median = findmedian(numsArr.map(x => Number(x.trim())));

  let data = `The median of ${nums} is ${median}\n`;

  if (request.query.save === undefined || request.query.save === 'true') {
    appendToFile(data);
  }
  return response.send(data);
});

app.get('/mode', function(request, response, next) {
  let nums = request.query.nums;
  if (!nums) return next(new Error(`nums are required.`));

  let numsArr = nums.split(',');

  for (let i of numsArr) {
    let newError = `'${i}' is not a number.`;
    if (isNaN(i)) return next(new Error(newError));
  }
  let mode = findmode(numsArr.map(x => Number(x.trim())));

  let data = `The mode of ${nums} is ${mode}\n`;

  if (request.query.save === undefined || request.query.save === 'true') {
    appendToFile(data);
  }
  return response.send(data);
});

app.get('/all', function(request, response, next) {
  let nums = request.query.nums;
  if (!nums) return next(new Error(`nums are required.`));

  let numsArr = nums.split(',');

  for (let i of numsArr) {
    let newError = `'${i}' is not a number.`;
    if (isNaN(i)) return next(new Error(newError));
  }

  let mean = findmean(numsArr.map(x => Number(x.trim())));
  let mode = findmode(numsArr.map(x => Number(x.trim())));
  let median = findmedian(numsArr.map(x => Number(x.trim())));

  let data1 = `The mean of ${nums} is ${mean}\n`;
  let data2 = `The median of ${nums} is ${median}\n`;
  let data3 = `The mode of ${nums} is ${mode}\n`;

  appendToFile(data1);
  appendToFile(data2);
  appendToFile(data3);

  return response.send(`${data1}\n${data2}\n${data3}\n`);
});

app.get('/results', function(request, response, next) {
  if (fs.existsSync('results.txt')) {
    fs.readFile(`results.txt`, 'UTF-8', function(err, data) {
      if (err) throw err;
      return response.send(data);
    });
  } else {
    return next(new Error(`There are no results yet.`));
  }
});

app.delete('/results', function(request, response, next) {
  if (fs.existsSync('results.txt')) {
    fs.unlink('results.txt', function(error) {
      if (error) {
        throw error;
      }
      return response.send('file deleted!');
    });
  } else {
    return next(new Error(`There are no results yet.`));
  }
});

function appendToFile(data) {
  fs.appendFile(`results.txt`, data, function(err) {
    if (err) throw err;
  });
}

function findmean(numsArr) {
  return numsArr.reduce((t, x) => t + x) / numsArr.length;
}

function findmedian(numsArr) {
  return numsArr.length % 2 === 0
    ? (numsArr[numsArr.length / 2] + numsArr[numsArr.length / 2 - 1]) / 2
    : numsArr[(numsArr.length / 2) >> 0];
}

function findmode(numsArr) {
  let obj = {};
  for (let i of numsArr) {
    obj[i] = ++obj[i] || 1;
  }
  let sortObj = Object.keys(obj).sort(function(a, b) {
    return obj[b] - obj[a];
  });

  return sortObj.filter(x => obj[x] === obj[sortObj[0]]);
}

// catch 404 and forward to error handler
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
  res.status(err.status || 500);
  return res.json({
    error: { message: err.message }

    /*
     if we're in development mode, include stack trace (full error object)
     otherwise, it's an empty object so the user doesn't see all of that
    */
    // error: app.get('env') === 'development' ? err : {}
  });
});

app.listen(3000, function() {
  console.log('Server starting');
});
