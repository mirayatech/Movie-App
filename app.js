// key: cc711dbd2e5433016dae5bfb30562cde
// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cc711dbd2e5433016dae5bfb30562cde&page=1

{
  /* <div class="overview">
<h3>Overview:</h3>
${overview}
</div> */
}

const APIURL =
  " https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cc711dbd2e5433016dae5bfb30562cde&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  " https://api.themoviedb.org/3/search/movie?&api_key=cc711dbd2e5433016dae5bfb30562cde&query=";

const form = document.querySelector("form");
const main = document.querySelector("main");
const search = document.getElementById("search");
const container = document.querySelector('.container')

// initially get fav movies
getMovies(APIURL);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  console.log(respData);

  showMovies(respData.results);
}

const convertTime = (time) => {
  return new Date(time).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const convertYearOnly = (time) => {
  return new Date(time).toLocaleDateString("en-us", {
    year: "numeric"
  });
};

function showMovies(movies) {
  // clear main
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, release_date, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
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

    movieEl.addEventListener('click', () => {
      container.classList.add('show')

      container.innerHTML = `
                        <img src="${IMGPATH + poster_path}" alt="${title}"/>
                            <div class="info">
                              <h1>${title} <span class="light-text">(${convertYearOnly(release_date)})</span></h1>


                            <div class="first-info">
                                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-bookmark"></i>
                            </div>
                            <div class="second-info">
                                <h3>Overview</h3>
                                <p>${overview}</p>
                              </div>

                            </div>`
    })

  });
}



function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);

    search.value = "";

    container.classList.remove('show')

  }
});
