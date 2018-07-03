let num = 13;
let api = `http://numbersapi.com/`;

//1.
console.log('#1');
$.getJSON(`${api}${num}?json`, res => console.log(res));

//2.
console.log('#2');
let arr = [2, 7, 8];

arr.map(x => $.getJSON(`${api}${x}?json`, r => console.log(r)));

//3.
function getFacts() {
  console.log('#3');
  $('ul').empty();

  Array(4)
    .fill(num)
    .map(x =>
      $.getJSON(`${api}${x}?json`, fact =>
        $('ul').append(`<li style="padding-top: 1em">${fact.text}</li>`)
      )
    );
}
