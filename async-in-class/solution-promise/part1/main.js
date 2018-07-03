let num = 13;
let api = `http://numbersapi.com/`;

//1.
console.log('#1');
$.getJSON(`${api}${num}?json`).then(res => console.log(res));

//2.
console.log('#2');
let arr = [2, 7, 8];

Promise.all(arr.map(x => $.getJSON(`${api}${x}?json`))).then(res =>
  res.forEach(r => console.log(r))
);

//3.
function getFacts() {
  console.log('#3');
  $('ul').empty();
  Promise.all(
    Array(4)
      .fill(num)
      .map(x => $.getJSON(`${api}${x}?json`))
  ).then(res =>
    res.forEach(fact =>
      $('ul').append(`<li style="padding-top: 1em">${fact.text}</li>`)
    )
  );
}
