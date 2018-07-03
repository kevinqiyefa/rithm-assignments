//1.
let api = `https://pokeapi.co/api/v2/pokemon/`;
$.getJSON(`${api}`, res =>
  res.results.forEach(p => {
    console.log(`URL: ${p['url']}`);
    console.log(`NAME: ${p['name']}`);
  })
);

// 2.
$.getJSON(`${api}?limit=1000`, res => {
  let i = 0;
  let random_three = [];
  while (i < 3) {
    random_three.push(
      res.results[Math.floor(Math.random() * res.results.length) + 1 - 1]
    );
    i++;
  }
  random_three.map(x =>
    $.getJSON(`${x['url']}`, res => {
      console.log(res['forms'][0]);
    })
  );
});

//3.
// $.getJSON(`${api}?limit=1000`)
//   .then(res => {
//     let i = 0;
//     let random_three = [];
//     while (i < 3) {
//       random_three.push(
//         res.results[Math.floor(Math.random() * res.results.length) + 1 - 1]
//       );
//       i++;
//     }
//     return Promise.all(random_three.map(x => $.getJSON(`${x['url']}`)));
//   })
//   .then(res => {
//     res.forEach(r => {
//       console.log(r['forms'][0]['url']);
//     });
//   });
