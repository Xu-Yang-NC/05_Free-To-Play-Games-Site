// Games class
class Games {
  constructor(){
    this.apiKey = '895d4b5caamsh229974bdc126ea1p1d51bfjsn719f09e5a48f';
  }

  // Fetch data from the api
  async getByDate() {
    const response = await fetch("https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=release-date", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        "x-rapidapi-key": `${this.apiKey}`
      }
    });
    const data = await response.json()
    return data;
  }
}


// UI class
class UI{
  constructor() {
    this.newestSection = document.querySelector('#newest');
  }

  // Render the game section
  render(results,begin,end) {
    for(let i=begin; i<end; i++) {
      let result = results[i];
      // Create a div element
      let games = document.createElement('div');
      games.className = "games";
      // Add more elements to the div to show game's data
      let html = `
        <div class="game">
        <img src=${result.thumbnail} alt="">
        <div class="info">
          <h2>Name:</h2>
          <a href="${result.freetogame_profile_url}">${result.title}</a>
          <span class="genre">${result.genre}</span>
          <h3>Description:</h3>
          <p>${result.short_description}</p>
        </div>
        </div>
      `
      // Append html to the section element
      games.innerHTML = html;
      this.newestSection.appendChild(games);
    }
  }

  search(results) {
    const homeBtn = document.querySelector("#home-btn");
    const newBtn = document.querySelector("#new-btn");
    const searchSection = document.querySelector('#search');
    const homeSection = document.querySelector('#home');
    const newestSection = document.querySelector('#newest');
    const nextSection = document.querySelector('#next');
    const searchInput = document.querySelector('#search-input').value;
    const searchList = document.querySelectorAll('#search .games');
    let games = document.createElement('div');
    games.className = "games";
    let html = '';

    // clear search section before adding new element, prevent duplication
    if(searchList){
      searchList.forEach(item => {
        item.remove();
      });
    }

    // Loop through the array to check if the game exist
    for(let result of results) {
      if(result.title.toLowerCase() === searchInput.toLowerCase()) {
        html = `
          <div class="game">
          <img src=${result.thumbnail} alt="">
          <div class="info">
            <h2>Name:</h2>
            <a href="${result.freetogame_profile_url}">${result.title}</a>
            <span class="genre">${result.genre}</span>
            <h3>Description:</h3>
            <p>${result.short_description}</p>
          </div>
          </div>
        `;
        break;
      } else {
        html = `
          <h1 class="alert">Sorry, the game is not exist!</h1>
        `
      }
    }

    // hide all the sections
    homeSection.style.display = "none";
    newestSection.style.display = "none";
    nextSection.style.display = "none";
    homeBtn.style.display = "none";
    newBtn.style.display = "none";
    games.innerHTML = html;
    searchSection.appendChild(games);

  }

}


const games = new Games();
const ui = new UI();
let begin = 0;
let end = 10;

games.getByDate().then(results => {
  console.log(results);

  ui.render(results,begin,end);

  // listen event for load more button
  document.querySelector('#ten-more').addEventListener('click', (e) => {
    begin += 10;
    end += 10;
    if(end > results.length){
      end = results.length;
    }
    ui.render(results,begin,end);
    e.preventDefault();
  });

  // listen event for search button
  document.querySelector("#search-btn").addEventListener('click',(e) => {
    ui.search(results);
    e.preventDefault();
  });

  // listen event for logo
  document.querySelector("#main-nav a img").addEventListener('click', (e) => {
    window.location.reload();
    e.preventDefault();
  });

});






