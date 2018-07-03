//1.
let api = `https://pokeapi.co/api/v2/pokemon/`;

async function part1() {
  let data = await $.getJSON(`${api}`);
  data.results.forEach(p => {
    console.log(`URL: ${p['url']}`);
    console.log(`NAME: ${p['name']}`);
  });
}
part1();

// 2.
async function part2() {
  let data = await $.getJSON(`${api}?limit=1000`);

  let i = 0;
  let random_three = [];
  while (i < 3) {
    random_three.push(
      data.results[Math.floor(Math.random() * data.results.length) + 1 - 1]
    );
    i++;
  }
  let random3 = await Promise.all(
    random_three.map(x => $.getJSON(`${x['url']}`))
  );
  random3.forEach(r => {
    console.log(r['forms'][0]);
  });
}
part2();

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
