$(function() {
  let $search = $('#searchGlphy');
  let $body = $('.imgBody');
  let term;

  $('form').on('submit', function(e) {
    term = $search.val();
    $search.val('');
    //stop the form from being submitted by default form behavior.
    e.preventDefault();

    $.getJSON('http://api.giphy.com/v1/gifs/search', {
      q: term,
      api_key: 'dc6zaTOxFJmzC'
    }).then(function(datas) {
      let count = (Math.random() * datas.data.length) >> 0;

      $body.append(
        $('<img>', {
          src: `${datas.data[count].images.fixed_height.url}`
        }).addClass('img')
      );
    });
  });

  $('#remove').on('click', function() {
    $body.empty();
  });
});
