const movieTime = {};

movieTime.apiUrl = 'https://api.themoviedb.org/3/search/movie?';
movieTime.apiKey = 'abca8adda9e521b362fff5ab08ec8402';

movieTime.getMovies = () => {
    const url = new URL(movieTime.apiUrl);
    url.search = new URLSearchParams({
        api_key: movieTime.apiKey,
        query: "spiderman"
    });

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        console.log(url)
}

movieTime.init = () => {
    movieTime.getMovies();
}

movieTime.init();

console.log("bjlabdf;safjaf")