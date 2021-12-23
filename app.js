const reelGoodFilms = {};

reelGoodFilms.apiUrl = 'https://api.themoviedb.org/3/search/movie?';
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
            console.log(data.results);
            const searchResultsData = data.results;
            reelGoodFilms.displayResults(searchResultsData);
        })
        console.log(url)
}

reelGoodFilms.searchParam = () => {
    const searchInput = document.querySelector('#searchInput');
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(searchInput.value);
        reelGoodFilms.getMovies();
    });
}

reelGoodFilms.displayResults = (arrayOfData) => {
    const paragraph = document.querySelector('p');
    arrayOfData.forEach(movie => {
        const movieDetails = document.createElement('p');
        movieDetails.textContent = movie.title;
        console.log(movieDetails);
        const searchResults = document.querySelector('.searchResults');
        searchResults.append(movieDetails);
    });
}

reelGoodFilms.init = () => {
    reelGoodFilms.searchParam();
}

reelGoodFilms.init();
