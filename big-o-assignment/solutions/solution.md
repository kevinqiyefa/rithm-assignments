# Big O Notation Exercises

## Part 1

Simplify the following big O expressions as much as possible:

1.  `O(n + 10)`
2.  `O(100 * n)`
3.  `O(25)`
4.  `O(n^2 + n^3)`
5.  `O(n + n + n + n)`
6.  `O(1000 * log(n) + n)`
7.  `O(1000 * n * log(n) + n)`
8.  `O(2^n + n^2)`
9.  `O(5 + 3 + 1)`
10. `O(n + n^(1/2) + n^2 + n * log(n)^10)`

## Part 2

Determine the time and space complexities for each of the following functions. If you're not sure what these functions do, copy and paste them into the console and experiment with different inputs!

1.  `logUpTo`

```js
function logUpTo(n) {
  for (var i = 1; i <= n; i++) {
    console.log(i);
  }
}
```

Time Complexity:

Space Complexity:

2.  `logAtMost10`

```js
function logAtMost10(n) {
  for (var i = 1; i <= Math.min(n, 10); i++) {
    console.log(i);
  }
}
```

Time Complexity:

Space Complexity:

3.  `logAtLeast10`

```js
function logAtLeast10(n) {
  for (var i = 1; i <= Math.max(n, 10); i++) {
    console.log(i);
  }
}
```

Time Complexity:

Space Complexity:

4.  `onlyElementsAtEvenIndex`

```js
function onlyElementsAtEvenIndex(array) {
  var newArray = [];
  for (var i = 0; i < array.length; i++) {
    if (i % 2 === 0) {
      newArray.push(array[i]);
    }
  }
  return newArray;
}
```

Time Complexity:

Space Complexity:

5.  subtotals

```js
function subtotals(array) {
  var subtotalArray = [];
  for (var i = 0; i < array.length; i++) {
    var subtotal = 0;
    for (var j = 0; j <= i; j++) {
      subtotal += array[j];
    }
    subtotalArray.push(subtotal);
  }
  return subtotalArray;
}
```

Time Complexity:

Space Complexity:

## Part 3

1.  True or false: `n^2 + n` is `O(n^2)`.
2.  True or false: `n^2 + n` is `O(n^3)`.
3.  True or false: `n^2 + n` is `O(n)`.
4.  What's the time complexity of the `.indexOf` array method?
5.  What's the time complexity of the `.includes` array method?
