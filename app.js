const reelGoodFilms = {};

reelGoodFilms.apiUrl = 'https://api.themoviedb.org/3/search/movie';
reelGoodFilms.discoverUrl = 'https://api.themoviedb.org/3/discover/movie';
reelGoodFilms.apiKey = 'abca8adda9e521b362fff5ab08ec8402';

reelGoodFilms.searchResults = document.querySelector('.resultsWrapper');

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
            reelGoodFilms.searchResults.innerHTML = "";
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
            reelGoodFilms.searchResults.innerHTML = "";
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
            reelGoodFilms.searchResults.innerHTML = "";
            reelGoodFilms.displaySearchResults(discoverGenresData);
        })
        console.log(url)
};


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

reelGoodFilms.searchByGenre = () => {
    const genreSelect = document.querySelector('#genres');
    const form = document.querySelector('#genreForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(genreSelect.value);
        reelGoodFilms.discoverMoviesByGenre(genreSelect);
    });
}

reelGoodFilms.displaySearchResults = (arrayOfData) => {
    arrayOfData.forEach(movie => {
        // Houses movie poster and movie details
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movieContainer');
        //Creates a img element for the movie poster.
        const moviePoster = document.createElement('img');
        //Appends src and alt to image element. 
        moviePoster.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
        moviePoster.alt = `Movie Poster for: ${movie.title}`;
        // Houses movie details ie title, desc., etc.
        const movieDetailsContainer = document.createElement('div');
        movieDetailsContainer.classList.add('movieDetailsContainer');
        // Creates an H2 heading for movie title
        const movieTitle = document.createElement('h2');
        movieTitle.textContent = movie.title;
        // Creates  an H3 heading for movie release date.
        const movieReleaseDate = document.createElement('h3');
        movieReleaseDate.textContent = `Release Date: ${movie.release_date}`;
        //Creates an H3 heading for movie overview
        const movieOverviewHeading = document.createElement('h3');
        movieOverviewHeading.textContent = 'Overview:'
        // Creates a p tag for movie overview description. 
        const movieOverview = document.createElement('p');
        movieOverview.textContent = `${movie.overview}`;
        // Creates a H3 heading for movie rating.
        const movieRatingHeading = document.createElement('h3');
        movieRatingHeading.textContent = 'User Rating:'
        //Creates a p tag for numerical movie rating. 
        const movieRating = document.createElement('p');
        movieRating.textContent = `${movie.vote_average}`;
        //Appends above elements to respective containers (<divs>).
        movieDetailsContainer.append(movieTitle, movieReleaseDate, movieOverviewHeading, 
            movieOverview, movieRatingHeading, movieRating);
        movieContainer.append(moviePoster, movieDetailsContainer)
        reelGoodFilms.searchResults.appendChild(movieContainer);
    });
}

reelGoodFilms.init = () => {
    reelGoodFilms.searchParam();
    reelGoodFilms.searchByYear();
    reelGoodFilms.searchByGenre();
}

reelGoodFilms.init();
