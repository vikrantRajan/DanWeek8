// Looping over each character and appending the option to the select on the DOM
const showCharacterName = (data) => {
  Object.keys(data).forEach((key) => {
    $('#characters').append(`<option value='${key}'>${data[key].characters.join(', ')}</option>`);
  });
};
// Displaying the actors real name
const realNameOfActor = (e, data) => {
  Object.keys(data).forEach((key) => {
    if (e.target.value === key) {
      $('#actor').html(data[key].name);
    }
  });
};
// Catching the json data
const cowboyHomework = () => {
  let movieInfo; // creating an empty variable to store the data
  // getting the json file, with the then method that allows two parameters 1. success 2. fail
  $.ajax({ url: '../film/cowboy.json' }).then(
    (data) => {
      movieInfo = { ...data }; // Using the spread operator to separate the array
      showCharacterName(movieInfo.movies[0].abridged_cast);
    },
    (err) => {
      // eslint-disable-next-line no-console
      console.log(err.statusText);
      // Error message incase the ajax call fails
      $('#characters').append("<option value=''>Please refresh the page and try again</option>");
    },
  );
  // event listener to show the real actors name when the input field gets updated
  $('#characters').change((e) => { realNameOfActor(e, movieInfo.movies[0].abridged_cast); });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = cowboyHomework;
}
