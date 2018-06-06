## Promises Exercise

Your goal in this exercise is to get some practice using AJAX with promise syntax, including `.then`, `.catch`, as well as some methods on the build-in `Promise` function.

Write the code required to complete each of these tasks. They will all require at least one AJAX requests. Be sure to favor syntax involving things like `.then` and `.catch` over deeply nested callbacks.

Also note that for some reason, the latest version of jQuery is not loaded on the jQuery website! This means, for example, that `.catch` is not a defined method on `$.get` or `$.getJSON`. To use a more recent version of jQuery, feel free to load your own `script` tag into an `index.html` file, or go to a website that loads a more recent version of jQuery (e.g. [Rithm School](https://www.rithmschool.com)).

**Exercises**

1.  Make a request to `https://swapi.co/api/` and then log the response to the console. This tells you what kinds of data are stored in the API.

```js
$.getJSON('https://swapi.co/api/')
  .then(obj => {
    console.log(obj);
  })
  .catch(err => {
    console.log(`Something went wrong: ${err}`);
  });
```

2.  Make a request to the `/films/` endpoint, and log out the names of all of the names and directors of the Star Wars films (it's okay if you log the same name more than once.) They should be in the format `FILM_NAME - FILM_DIRECTOR`.

```js
$.getJSON('https://swapi.co/api/films/')
  .then(obj => {
    obj.results.forEach(movie =>
      console.log(`${movie.title} - ${movie.director}`)
    );
  })
  .catch(err => {
    console.log(`Something went wrong: ${err}`);
  });
```

3.  Make a request to the first planet. Once you get the response, make a request to get information on each of that planet's residents. Once you get THAT information back, log out the name of every resident for that first planet.

```js
$.getJSON('https://swapi.co/api/planets/1/')

  .then(res => {
    return Promise.all(res.residents.map(x => $.getJSON(x)));
  })
  .then(residents => {
    residents.forEach(res => console.log(res));
  })
  .catch(err => {
    console.log(`Something went wrong: ${err}`);
  });
```

4.  It's a fight for the galaxy! Race two requests: one to the 1st person, and one to the 4th person (based on their ids). If the request to the 1st person is processed first, log a message stating that the 1st person has saved the galaxy. Otherwise, log a message that the galaxy has fallen to the 4th person.

```js
Promise.race([1, 4].map(id => $.getJSON(`https://swapi.co/api/people/${id}/`)))
  .then(res => {
    if (res.name === 'Luke Skywalker') {
      console.log('The 1st person has saved the galaxy');
    } else {
      console.log('The galaxy has fallen to the 4th person. ');
    }
  })
  .catch(err => {
    console.log(`Something went wrong: ${err}`);
  });
```
