const reelGoodFilms = {};

reelGoodFilms.apiUrl = 'https://api.themoviedb.org/3/search/movie';
reelGoodFilms.discoverUrl = 'https://api.themoviedb.org/3/discover/movie';
reelGoodFilms.apiKey = 'abca8adda9e521b362fff5ab08ec8402';

reelGoodFilms.getMovies = () => {
    const url = new URL(reelGoodFilms.apiUrl);
    url.search = new URLSearchParams({
        api_key: reelGoodFilms.apiKey,
        query: `${searchInput.value}`
    });

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const searchResultsData = data.results;
            searchResults.innerHTML = "";
            reelGoodFilms.displaySearchResults(searchResultsData);
        })
        console.log(url)
}

reelGoodFilms.discoverMovies = () => {
    const url = new URL(reelGoodFilms.discoverUrl);
    url.search = new URLSearchParams({
        api_key: reelGoodFilms.apiKey,
        year: `${yearInput.value}`,
        include_adult: false
    });

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const discoverMoviesData = data.results;
            searchResults.innerHTML = "";
            reelGoodFilms.displaySearchResults(discoverMoviesData);
        })
        console.log(url)
};

reelGoodFilms.discoverMoviesByGenre = (genre) => {
    const url = new URL(reelGoodFilms.discoverUrl);
    url.search = new URLSearchParams({
        api_key: reelGoodFilms.apiKey,
        with_genres: `${genre.value}`,
        include_adult: false
    });

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const discoverGenresData = data.results;
            searchResults.innerHTML = "";
            reelGoodFilms.displaySearchResults(discoverGenresData);
        })
        console.log(url)
};

// const genreSelect = document.querySelector('#genres');
// genreSelect.addEventListener('change', () => {
//     console.log(genreSelect.value)
// });


const searchResults = document.querySelector('.resultsOutput');
const discoverButton = document.querySelector('.discoverButton');

reelGoodFilms.searchParam = () => {
    const searchInput = document.querySelector('#searchInput');
    const form = document.querySelector('#searchForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(searchInput.value);
        reelGoodFilms.getMovies();
    });
}

reelGoodFilms.searchByYear = () => {
    const yearInput = document.querySelector('#yearInput');
    const form = document.querySelector('#discoverForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(yearInput.value);
        reelGoodFilms.discoverMovies();
    });
}

reelGoodFilms.searchByGenre = (genre) => {
    const genreSelect = document.querySelector('#genres');
    const form = document.querySelector('#genreForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(genreSelect.value);
        reelGoodFilms.discoverMoviesByGenre(genreSelect);
    });
}


reelGoodFilms.displaySearchResults = (arrayOfData) => {
    const paragraph = document.querySelector('p');
    arrayOfData.forEach(movie => {
        const movieDetails = document.createElement('p');
        movieDetails.textContent = movie.title;
        const moviePoster = document.createElement('img');
        moviePoster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
        const movieReleaseDate = document.createElement('p');
        movieReleaseDate.textContent = `Release Date: ${movie.release_date}`;
        const movieOverview = document.createElement('p');
        movieOverview.textContent = `Overview: ${movie.overview}`;
        const movieRating = document.createElement('p');
        movieRating.textContent = `User Rating: ${movie.vote_average}`;
        console.log(movieDetails);
        searchResults.append(movieDetails, movieReleaseDate, moviePoster, movieOverview, movieRating);
    });
}

reelGoodFilms.init = () => {
    reelGoodFilms.searchParam();
    reelGoodFilms.searchByYear();
    reelGoodFilms.searchByGenre();
}

reelGoodFilms.init();
