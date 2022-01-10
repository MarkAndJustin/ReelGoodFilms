//Initializes app as an empty object. 
const reelGoodFilms = {};

//Api endpoints/urls
reelGoodFilms.apiUrl = 'https://api.themoviedb.org/3/search/movie';
reelGoodFilms.discoverUrl = 'https://api.themoviedb.org/3/discover/movie';

//Api key
reelGoodFilms.apiKey = 'abca8adda9e521b362fff5ab08ec8402';

//Div where all search results will be appended to. 
reelGoodFilms.searchResults = document.querySelector('.resultsWrapper');
reelGoodFilms.jumpToResults = document.querySelector('.jumpToResults');

//Function that makes a call to the api and returns movie data. 
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
        console.log(data)
        const searchResultsData = data.results;
        reelGoodFilms.searchResults.innerHTML = "";
        reelGoodFilms.displaySearchResults(searchResultsData);
        reelGoodFilms.jumpToResults.style.display = "block";
    })
};

//Function that makes a call to the api with the discover endpoint. 
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
        const discoverMoviesData = data.results;
        reelGoodFilms.searchResults.innerHTML = "";
        reelGoodFilms.displaySearchResults(discoverMoviesData);
        reelGoodFilms.jumpToResults.style.display = "block";
    })
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
        const discoverGenresData = data.results;
        reelGoodFilms.searchResults.innerHTML = "";
        reelGoodFilms.displaySearchResults(discoverGenresData);
        reelGoodFilms.jumpToResults.style.display = "block";
    })
};

//Function that grabs user input and runs getMovies function.
reelGoodFilms.searchParam = () => {
    const form = document.querySelector('#searchForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        reelGoodFilms.getMovies();
    });
};

reelGoodFilms.searchByYear = () => {
    const form = document.querySelector('#discoverForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        reelGoodFilms.discoverMovies();
    });
};

reelGoodFilms.searchByGenre = () => {
    const form = document.querySelector('#genreForm');
    const genreSelect = document.querySelector('#genres')
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        reelGoodFilms.discoverMoviesByGenre(genreSelect);
    });
};

//Function that displays and appends data to the HTML. 
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
        movieContainer.append(moviePoster, movieDetailsContainer);
        reelGoodFilms.searchResults.appendChild(movieContainer);
    });
};

//Initializes functions on page load. 
reelGoodFilms.init = () => {
    reelGoodFilms.searchParam();
    reelGoodFilms.searchByYear();
    reelGoodFilms.searchByGenre();
};

//Calls init function. 
reelGoodFilms.init();
