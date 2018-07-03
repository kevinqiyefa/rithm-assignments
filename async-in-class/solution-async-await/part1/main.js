let num = 13;
let api = `http://numbersapi.com/`;

//1.
async function part1() {
  let data = await $.getJSON(`${api}${num}?json`);
  console.log(data);
}
part1();

//2.
async function part2() {
  let arr = [2, 7, 8];

  let data = await $.getJSON(`${api}${arr}?json`);
  for (let d in data) {
    console.log(data[d]);
  }
}
part2();

//3.
async function getFacts() {
  $('ul').empty();
  let data = await Promise.all(
    Array(4)
      .fill(num)
      .map(x => $.getJSON(`${api}${x}?json`))
  );
  data.forEach(fact =>
    $('ul').append(`<li style="padding-top: 1em">${fact.text}</li>`)
  );
}
