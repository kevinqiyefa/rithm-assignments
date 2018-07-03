/** Your code here */
//1.
let api = `https://deckofcardsapi.com/api/deck/new/draw/?count=1`;

$.getJSON(`${api}`, res =>
  console.log(`${res['cards'][0]['value']} of ${res['cards'][0]['suit']}`)
);

//2.
$.getJSON(`https://deckofcardsapi.com/api/deck/new/draw/?count=2`, res => {
  res['cards'].forEach(card =>
    console.log(`${card['value']} of ${card['suit']}`)
  );
});

//3.

let images = [];
function part3() {
  $.getJSON(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`, res => {
    res['cards'].forEach(card => images.push(card['image']));
  });
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
