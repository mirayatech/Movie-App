// API-KEY: cc711dbd2e5433016dae5bfb30562cde

// URLS
const APIURL =
  " https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cc711dbd2e5433016dae5bfb30562cde&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  " https://api.themoviedb.org/3/search/movie?&api_key=cc711dbd2e5433016dae5bfb30562cde&query=";

// SELECTORS
const form = document.querySelector("form");
const main = document.querySelector("main");
const search = document.getElementById("search");
const container = document.querySelector(".container");
const navLinks = document.querySelectorAll('.nav-item')
const tagsEl = document.getElementById('genres')

// const movies = JSON.parse(localStorage.getItem('movies') || '[]')

// Genres


// initially get fav movies
getMovies(APIURL);

// fetching Movies
async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  console.log(respData);

  showMovies(respData.results);
}

// show movies
function showMovies(movies) {
  main.innerHTML = "";

  // create movie Layout
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, release_date, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
                  <i onclick="addToFavorite(this)" class="fa-solid fa-star"></i>
                  <img src="${IMGPATH + poster_path}" alt="${title}"/>
                  <div class="primary-info">
                      <h3>${title}</h3>
                      <div class ="secondary-info">
                      <p class"date">${convertTime(release_date)}</p>
                      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                  </div>
                  </div>
              `;
    main.appendChild(movieEl);

    // show container layout, if we click on movie
    movieEl.addEventListener("click", () => {
      container.classList.add("show");

      container.innerHTML = `
                              <i onclick="addToFavorite(this)" class="fa-solid fa-star"></i>
                              <img src="${IMGPATH + poster_path}" alt="${title}"/>
                              <div class="wrapper">
                                  <h1>${title} <span class="light-text">(${convertYear(release_date)})</span></h1>
                                  <div class ="rate">
                                  <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                                  
                              </div>
                             <div class ="overview">
                             <h3>Overview</h3>
                             <p>${overview}</p>
                          </div>
                          <div class="date">
                          <p class"date"><span class="thick-text">Release date:</span> ${convertTime(release_date)}</p>
                          </div>
                              </div>`;
    });

  });
}

const convertYear = (time) => {
  return new Date(time).toLocaleDateString("en-us", {
    year: "numeric",
  });
};

const convertTime = (time) => {
  return new Date(time).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};


// search for MOvie
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    search.value = "";
    container.classList.remove("show");
  }
});


// change color of rating count
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}


function addToFavorite(e) {
  let movie = e.parentNode;
  console.log(movie)

  // let movieInfo { }
  // movies.push(movieInfo)
  // localStorage.setItem('movies', JSON.stringify(movieInfo));
}