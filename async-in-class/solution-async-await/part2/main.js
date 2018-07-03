/** Your code here */
//1.
let api = `https://deckofcardsapi.com/api/deck/new/draw/?count=1`;

async function part1() {
  let data = await $.getJSON(`${api}`);
  console.log(`${data['cards'][0]['value']} of ${data['cards'][0]['suit']}`);
}
part1();

//2.
async function part2() {
  let data = await $.getJSON(
    `https://deckofcardsapi.com/api/deck/new/draw/?count=2`
  );
  data['cards'].forEach(card =>
    console.log(`${card['value']} of ${card['suit']}`)
  );
}
part2();

//3.

let images = [];
async function part3() {
  let data = await $.getJSON(
    `https://deckofcardsapi.com/api/deck/new/draw/?count=52`
  );
  data['cards'].forEach(card => images.push(card['image']));
}
part3();

function displayCards() {
  if (images.length < 1) {
    $('ul').empty();
    part3();
  } else {
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;

    $('ul').append(
      $('<li>').append(
        $('<img>', {
          src: images.pop(),
          width: '150',
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
      )
    );
  }
}
