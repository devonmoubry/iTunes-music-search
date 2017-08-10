/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
let url =                         'https://itunes.apple.com/search?term=';
let searchForm =                  document.querySelector('.search-form');
let searchInput =                 document.querySelector('.search-input');
let searchButton =                document.querySelector('#search-button');
let resultsContainer =            document.querySelector('.results');
let searchValue =                 '';
let searchResultsHeading =        document.createElement('div');
let searchResultsBody =           document.createElement('div');
searchResultsHeading.setAttribute('class', 'results-heading');
searchResultsBody.setAttribute('class', 'results-body');


// 2. Create your `submit` event for getting the user's search term
searchForm.addEventListener('submit', (e) => {
  searchValue = e.target[0].value;
  e.preventDefault();
  console.log('hello');
  console.log(searchValue);
// 3. Create your `fetch` request that is called after a submission
  fetch( url + searchValue )
    .then(function(response) {
      if (response.status !== 200) {
        console.log(response.status);
        return;
      } // if
      response.json().then(function(data) {
        console.log("test", response.url);
        // 4. Create a way to append the fetch results to your page
        let results = data.results;
        let resultContainer = '';
        results.forEach( result => {
          resultContainer += `
            <div class="result">
              <img src="${result.artworkUrl100}" alt="${result.trackName} picture" title="${result.previewUrl}">
              <p class="song">${result.trackName}</p>
              <p class="artist">${result.artistName}</p>
            </div>
          `
        }); // results.forEach()

       searchResultsMessage = `<h4>Showing results for '${searchValue}'...</h1><hr>`;
       searchResultsHeading.innerHTML =  searchResultsMessage;
       searchResultsBody.innerHTML = resultContainer;
       resultsContainer.append(searchResultsBody);
      }); // response.json().then
    }) // .then()

    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    }); // .catch()

  resultsContainer.append(searchResultsHeading);
}); // searchForm.addEventListener()

// 5. Create a way to listen for a click that will play the song in the audio play
searchResultsBody.addEventListener('click', (e) => {
  e.preventDefault();
  let audioSource = document.getElementsByTagName('source');
  let audio =       document.querySelector('audio');
  audioSource[0].setAttribute('src', e.target.title);
  audio.load();
}); // searchResultsBody.addEventListener()
