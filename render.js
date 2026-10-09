
function createIcons() {
  const play = document.createElement("span");
  play.innerHTML = `<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4 2.5v11l9-5.5-9-5.5z"/></svg>`;

  const favorite = document.createElement("span");
  favorite.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
    <path d="M12 20.5s-7.5-4.6-10-9.3C.4 7.8 2 4.3 5.4 3.6c2-.4 4 .5 5.1 2.3a5.4 5.4 0 0 1 5.1-2.3c3.4.7 5 4.2 3.4 7.6-2.5 4.7-10 9.3-10 9.3z"/>
  </svg>`;

  const rating = document.createElement("span");
  rating.innerHTML = `<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 .8l2.09 4.53 4.91.6-3.65 3.4.98 4.87L8 11.9l-4.33 2.3.98-4.87L1 6.93l4.91-.6L8 .8z"/></svg>`;

  return {
    play,
    favorite,
    rating
  };
}




function renderMovies(movies, container, icons, favorites = [])  {
    container.innerHTML = "";
  movies.forEach((movie) => {
    const card = document.createElement("article");
    card.classList.add("movie-card");
    card.dataset.movieId = movie.id;
    card.dataset.genre = movie.genre;

    const poster = document.createElement("img");
    
      poster.classList.add("movie-card__poster", "is-loading");
    poster.src = movie.image;
   
    poster.alt = movie.title;
    poster.addEventListener("load", () => {
  poster.classList.remove("is-loading");
});
poster.addEventListener("error", () => {
  poster.src = "https://placehold.co/500x750/1a1a1a/ffffff?text=No+Poster";

  poster.classList.remove("is-loading");
});
    const wrapper = document.createElement("div");
    wrapper.classList.add("movie-card__poster-wrap");
    const button = document.createElement("button");
    button.classList.add("movie-card__play");
    button.type = "button";
    button.ariaLabel = movie.title;
     const icon = icons.play.cloneNode(true);
    button.append(icon);
    const favouriteBtn = document.createElement("button");
    favouriteBtn.classList.add("movie-card__favorite");
    favouriteBtn.type = "button";
    favouriteBtn.ariaPressed = "false";
    favouriteBtn.ariaLabel = movie.title;
    const favouriteSvg = icons.favorite.cloneNode(true);
const somecheck = favorites.some(
  item => item.toString() === movie.id.toString()
);

if (somecheck) {
  favouriteBtn.ariaPressed = "true";
  favouriteBtn.classList.add("is-favorite");
} else {
  favouriteBtn.ariaPressed = "false";
}




    const cardBody = document.createElement("div");
    cardBody.classList.add("movie-card__body");
    const h3 = document.createElement("h3");
    h3.classList.add("movie-card__title");
    h3.textContent = movie.title;
    const meta = document.createElement("div");
    meta.classList.add("movie-card__meta");
    const year = document.createElement("span");
    year.textContent = movie.year;
    const genre = document.createElement("span");
    genre.textContent = movie.genre;
    const rating = document.createElement("span");
    rating.classList.add("movie-card__rating");
    rating.textContent = movie.rating;
   
     const rateSVG = icons.rating.cloneNode(true);
    rating.append(rateSVG);

    meta.append(year, genre, rating);
    cardBody.append(h3 , meta);
    favouriteBtn.append(favouriteSvg);
    wrapper.append(poster, button, favouriteBtn);
    card.append(wrapper, cardBody);
    container.append(card);
  });
  
  const cards = container.querySelectorAll(".movie-card");
  gsap.from(cards, {
    opacity:0,
     duration: 0.7,
    stagger: 0.08

  });
}
 function convertMovie(movie, genreMap) {
  return {
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    rating: movie.vote_average,
    year: movie.release_date
      ? movie.release_date.split("-")[0]
      : "N/A",
    image: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://placehold.co/500x750/1a1a1a/ffffff?text=No+Poster",
    genre: movie.genre_ids
      .map(id => genreMap[id]?.toLowerCase())
      .filter(Boolean)
      .join(", ")
  };
}
function getIcons() {
  const existingButton = document.querySelector(".movie-card__play");
  const favBtn = document.querySelector(".movie-card__favorite");
  const ratingSpan = document.querySelector(".movie-card__rating");

  return {
    play: existingButton.querySelector("svg"),
    favorite: favBtn.querySelector("svg"),
    rating: ratingSpan.querySelector("svg"),
  };
}
