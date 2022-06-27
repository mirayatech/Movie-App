// key: cc711dbd2e5433016dae5bfb30562cde
// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cc711dbd2e5433016dae5bfb30562cde&page=1

const APIURL =
    " https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cc711dbd2e5433016dae5bfb30562cde&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const main = document.createElement('main')
document.body.appendChild(main)

async function getMovies() {
    const response = await fetch(APIURL);
    const responseData = await response.json();

    console.log(responseData);

    responseData.results.forEach((movie) => {
        const { poster_path, title, vote_average } = movie;

        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");

        movieElement.innerHTML = `
                                <img src="${IMGPATH + poster_path
            }" alt="${title}">
                                <div class="movie-info">
                                <h3>${title}</h3>
                                <span class="rating">${vote_average}</span>
                                </div>
                                `;

        main.appendChild(movieElement);
    });

    return responseData;
}

getMovies();
