// dummy data
let stories = {
  Google: '(google.com)',
  Yahoo: '(yahoo.com)',
  SoundHound: '(soundhound.com)',
  'Rithm School': '(rithmschool.com)',
  'Google font': '(google.com)'
};

let fav = {};

//add listener and listen if story button is clicked or not.
function listenNewStoriesButton() {
  $('.newStories').on('click', function() {
    //clear the story list
    $('.list-all').empty();
    //change to default "Favorites" button
    $('.favorites').text('Favorites');
    //display all the stories
    displayAllStories(stories);
  });
}

//listen the submit button and get the input values
function listenSubmitButton() {
  $('form').submit(function(e) {
    //get the value from the input form and add them to the body-list
    getValFromInput();
    //stop the form from being submitted by default form behavior.
    e.preventDefault();
  });
}

//get the value from the input fields and add them to the body-list
function getValFromInput() {
  let k = $('#inputTitle').val();
  //filter the url chars
  let v = $('#url')
    .val()
    .replace('http://www.', '')
    .replace('https://www.', '');
  //store the values into story object
  stories[k] = `(${v})`;

  //append the values to the ordered list tag.
  appendStoriesToBody(k, stories[k]);

  //reset/clear the input fields
  $('#inputTitle').val('');
  $('#url').val('');
}

//append the values to the ordered list tag.
function appendStoriesToBody(k, v) {
  let body = $('.list-all');
  //check if key in the 'fav' object or not. if yes, use the black star class.
  let starClass = k in fav ? 'fas fa-star' : 'far fa-star';
  //append star, title, and url to the list.
  let list = $('<li>')
    .append(
      $('<i>')
        .addClass(starClass)
        .on('click', toggleStar)
    )
    .append(
      $('<span>')
        .text(k)
        .addClass('title-list')
    )
    .append(
      $('<span>')
        .text(v)
        .addClass('url-list')
        .on('click', listenUrlClicked)
    );
  body.append(list);
}

//toggle the star element, and update the 'fav' object
function toggleStar() {
  $(this).toggleClass('fas far');
  let k = $(this).next();
  let key = k.text();
  let val = k.next().text();

  //update the 'fav' object
  if ($(this).hasClass('fas')) {
    fav[key] = val;
  } else {
    delete fav[key];
  }
}

//display the favorite stories.
function displayFavorites() {
  $('.favorites').on('click', function() {
    //check 'favorite' button or 'all' button
    $(this).text(function(i, text) {
      //clear the story list
      $('.list-all').empty();
      //display all stories if clicking the 'All' button
      if (text === 'All') {
        displayAllStories(stories);
        return 'Favorites';
      } else {
        //else display all favorite stories
        //collapse the form when viewing the favorite stories
        $('.collapse').collapse('hide');
        //check if there's any favorite story
        if (Object.keys(fav).length > 0) {
          //display favorite stories only.
          displayAllStories(fav);
        } else {
          alert("You don't have any favorite story!");
        }
        return 'All';
      }
    });
  });
}

//display all Stories
function displayAllStories(storyObj) {
  for (let key in storyObj) {
    appendStoriesToBody(key, storyObj[key]);
  }
}

//listen URL clicked
function listenUrlClicked() {
  $('.list-all').empty();
  $('.favorites').text('All');
  //only display the same value(url) in the 'stories' object.
  for (let key in stories) {
    if (stories[key] === $(this).text()) appendStoriesToBody(key, stories[key]);
  }
}

//listen new-stories button
listenNewStoriesButton();

//append dummy data to the body;
displayAllStories(stories);

//listen submit button
listenSubmitButton();

//favorite
displayFavorites();
