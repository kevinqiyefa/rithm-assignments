// document.addEventListener('DOMContentLoaded', () => {
$(() => {
  let wordCount = 10;
  let guessCount = 4;
  let password = '';

  $('#start').on('click', () => {
    $('#start-screen').toggleClass('show hide');
    $('#game-screen').toggleClass('show hide');
    startGame();
  });

  function startGame() {
    // get random words and append them to the DOM
    let $wordList = $('#word-list');
    // 'words' letiable is from words.js
    let randomWords = getRandomValues(words, wordCount); // eslint-disable-line no-undef
    randomWords.forEach(word => {
      $wordList.append($('<li>').text(word));
    });

    // set a secret password and the guess count display
    password = getRandomValues(randomWords, 1)[0];
    setGuessCount(guessCount);

    // add update listener for clicking on a word
    $wordList.on('click', 'li', updateGame);
  }

  function getRandomValues(array, numberOfVals) {
    return shuffle(array).slice(0, numberOfVals);
  }

  function shuffle(array) {
    let arrayCopy = array.slice();
    for (let idx1 = arrayCopy.length - 1; idx1 > 0; idx1--) {
      // generate a random index between 0 and idx1 (inclusive)
      let idx2 = Math.floor(Math.random() * (idx1 + 1));

      // swap elements at idx1 and idx2
      [arrayCopy[idx1], arrayCopy[idx2]] = [arrayCopy[idx2], arrayCopy[idx1]];
    }
    return arrayCopy;
  }

  function setGuessCount(newCount) {
    guessCount = newCount;
    $('#guesses-remaining').text(`Guesses remaining: ${guessCount}.`);
  }

  function updateGame() {
    if (!$(this).hasClass('disabled')) {
      // grab guessed word, check it against password, update view
      let guess = $(this).text();
      let similarityScore = compareWords(guess, password);
      $(this).addClass('disabled');
      $(this).text(`${guess} --> Matching Letters: ${similarityScore}`);
      setGuessCount(guessCount - 1);

      // check whether the game is over
      if (similarityScore === password.length) {
        $('#winner').toggleClass('hide show');
        $('#word-list').off();
      } else if (guessCount === 0) {
        $('#loser').toggleClass('hide show');
        $('#word-list').off();
      }
    }
  }

  function compareWords(word1, word2) {
    if (word1.length !== word2.length) {
      throw 'Words must have the same length';
    }
    let count = 0;
    for (let i = 0; i < word1.length; i++) {
      if (word1[i] === word2[i]) count++;
    }
    return count;
  }
});
