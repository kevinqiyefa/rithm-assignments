# Async Conceptual Warmup

You may fork or clone this repository. Feel free to place answers in this README.

## Questions

1.  What does asynchronous mean?

    - When you execute something asynchronously, you can move on to another task before it finishes.

2.  What is a callback function?

    - A callback function is a function you provide to another piece of code, allowing it to be called by that code.

3.  What is a promise?

    - A promise is an object that may produce a single value some time in the future

4.  Rewrite this "callback-style" AJAX call to use the Promises API

    ```js
    function popUpFact() {
      $.getJSON('http://numbersapi.com/42?json', function(fact) {
        alert(fact.text);
      });
    }

    function popUpFact() {
      $.getJSON('http://numbersapi.com/42?json').then(function(fact) {
        alert(fact.text);
      });
    }
    ```

5.  Change your solution so that it gets facts for two different numbers,
    requesting both at once, but only popping up the alert once the
    server has responded to both.

    ```js
    function popUpFact() {
      $.getJSON('http://numbersapi.com/42,3?json').then(function(fact) {
        alert(fact.text);
      });
    }
    ```

6.  What does "resolve" mean?

    - it means the promise has been resolved; for example, when the function make a request and it gets the response successfully, then that's resolve.

7.  What does "reject" mean?

    - it means the promise has been rejected; for example, when the function make a request and it gets a bad response, then that's reject.

8.  What is the difference between an `async` function and a regular function?

    - Async functions return a Promise implicitly. If the function throws an error, the Promise will be rejected. If the function returns a value, the Promise will be resolved. Async function also comes with the keyword `await` inside the function and before the request.

9.  Rewrite the above popUpFact function to use `async` / `await`

    ```js
    async function popUpFact() {
      let data = await $.getJSON('http://numbersapi.com/42?json');
      alert(data.text);
    }
    ```

10. What does `Promise.all` do?

    - Promise.all takes an array (or any iterable) of promises and fulfills when all of them fulfill or rejects when one of them rejects.

11. What does the following function do?

```js
// you can assume that jQuery has been loaded
function getUserData(username) {
  return $.getJSON(`https://api.github.com/users/${username}`);
}
```

- it's the function that return a promise.
