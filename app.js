// API-KEY: cc711dbd2e5433016dae5bfb30562cde

// URLS
const APIURL = " https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cc711dbd2e5433016dae5bfb30562cde&page=1";
const SEARCHAPI = " https://api.themoviedb.org/3/search/movie?api_key=cc711dbd2e5433016dae5bfb30562cde&query=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const MOVIE_ID_URL = "https://api.themoviedb.org/3/movie/{movie_id}?api_key=cc711dbd2e5433016dae5bfb30562cde"

// ---------------------------------------------------------------------------


// SELECTORS
const form = document.querySelector("form");
const main = document.querySelector("main");
const search = document.getElementById("search");
const container = document.querySelector(".container");
const navLinks = document.querySelectorAll(".nav-item");
const tagsEl = document.getElementById("genres");

// ---------------------------------------------------------------------------


// initially get fav movies
getMovies(APIURL);

// fetching Movies
async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  showMovies(respData.results);
  // console.log(respData);
}


// ---------------------------------------------------------------------------


// DIsplay the movies on the page
function showMovies(movies) {
  main.innerHTML = "";

  // create movie Layout
  movies.forEach((movie) => {
    const {
      poster_path,
      title,
      vote_average,
      release_date,
      overview,
      backdrop_path,
      id
    } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.setAttribute("data-id", `${id}`);

    movieEl.innerHTML = `
                  <i onclick="addToFavorite(this)" class="fa-solid fa-star"></i>
                  <img src="${IMGPATH + poster_path}" alt="${title}"/>
                  <div class="primary-info">
                      <h3>${title}</h3>
                      <div class ="secondary-info">
                      <p class"date">${convertTime(release_date)}</p>
                      <span class="${getClassByRate(
      vote_average
    )}">${vote_average}</span>
                  </div>
                  </div>
              `;
    main.appendChild(movieEl);

    // show container layout, if we click on movie
    movieEl.addEventListener("click", () => {
      container.classList.add("show");

      container.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%), url( ${IMGPATH + backdrop_path
        } )`;

      container.innerHTML = `
                              <img src="${IMGPATH + poster_path
        }" alt="${title}"/>
                              <div class="wrapper">
                                  <h1>${title} <span class="light-text">(${convertOnlyYear(
          release_date
        )})</span></h1>
                                  <div class ="rate">
                                  <span class="${getClassByRate(
          vote_average
        )}">${vote_average}</span>
                                  
                              </div>
                             <div class ="overview">
                             <h3>Overview</h3>
                             <p>${overview}</p>
                          </div>
                          <div class="date">
                          <p class"date"><span class="thick-text">Release date:</span> ${convertTime(
          release_date
        )}</p>
                          </div>
                              </div>`;
    });
  });
}

// ---------------------------------------------------------------------------


const convertOnlyYear = (time) => {
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

// ---------------------------------------------------------------------------


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

// ---------------------------------------------------------------------------


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

// ---------------------------------------------------------------------------


// when click on star, it adds to favorite movies
function addToFavorite(e) {
  const movie = e.parentNode;
  const id = movie.dataset.id;
  const movieIds = JSON.parse(localStorage.getItem("movieIds")) || [];
  movieIds.push(id);
  localStorage.setItem("movieIds", JSON.stringify(movieIds));
  console.log(movieIds);
}

// ---------------------------------------------------------------------------


// get all favorite movies using movie ids
async function getMoviesViaIds(movieIds) {
  const movieIdsCopy = [...movieIds];

  const movies = [];

  movieIdsCopy.forEach((movieId) => {
    // fetch a movie
    fetch()


    // create a movie object with properties i only need
    const {
      poster_path,
      title,
      vote_average,
      release_date,
      id
    } = favoriteMovies;

    // push into movies
  });

  return movies;
}


// ---------------------------------------------------------------------------

async function getAndDisplayFavoriteMovies() {
  // get movie ids from localstorage
  // get movies
  // loop over movies, and append each movie as a list item to the list
}
