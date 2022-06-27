// key: cc711dbd2e5433016dae5bfb30562cde
// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cc711dbd2e5433016dae5bfb30562cde&page=1

const APIURL =
  " https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cc711dbd2e5433016dae5bfb30562cde&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

async function getMovies() {
  const response = await fetch(APIURL);
  const responseData = await response.json();

  console.log(responseData);

  responseData.results.forEach((movie) => {
    const img = document.createElement("img");
    img.src = IMGPATH + movie.poster_path;

    document.body.appendChild(img);
  });

  return responseData;
}

getMovies();
