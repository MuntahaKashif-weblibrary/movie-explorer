const movies = [
  {
    id: "knives-out",
    tmdbId: 546554,
    title: "Knives Out",
    year: 2019,
    genre: "mystery",
    rating: 7.8,
    image: "images/knives out.jpg",
    description:
      "A detective investigates the mysterious death of a wealthy crime novelist, uncovering secrets within his eccentric family.",
    cast: [],
    trailer: "qGqiHJTsRkQ"
  },

  {
    id: "mv-01",
    tmdbId: 414906,
    title: "The Batman",
    year: 2022,
    genre: "crime",
    rating: 7.7,
    image: "images/batman.jpg",
    description:
      "Batman investigates a series of mysterious crimes while uncovering a dangerous conspiracy in Gotham City.",
    trailer: "mqqft2x_Aa4"
  },

  {
    id: "mv-02",
    tmdbId: 453395,
    title: "Doctor Strange in the Multiverse of Madness",
    year: 2022,
    genre: "fantasy",
    rating: 7.1,
    image: "images/docter-stranger.jpg",
    description:
      "Doctor Strange travels through dangerous alternate realities while facing a mysterious new threat.",
    trailer: "sVoHBPYtKbQ"
  },

  {
    id: "mv-03",
    tmdbId: 157336,
    title: "Interstellar",
    year: 2014,
    genre: "science fiction",
    rating: 8.7,
    image: "images/interstellar.jpg",
    description:
      "A group of explorers travels through space in search of a new home for humanity.",
    trailer: "zSWdZVtXT7E"
  },

  {
    id: "mv-04",
    tmdbId: 27205,
    title: "Inception",
    year: 2010,
    genre: "science fiction",
    rating: 8.4,
    image: "images/inception.jpg",
    description:
      "A skilled team enters the dreams of others to perform an extraordinary form of corporate espionage.",
    trailer: "YoHD9XEInc0"
  },

  {
    id: "mv-05",
    tmdbId: 603,
    title: "The Matrix",
    year: 1999,
    genre: "science fiction",
    rating: 8.2,
    image: "images/matrix_ver1.jpg",
    description:
      "A computer hacker discovers that reality is not what it appears to be.",
    trailer: "vKQi3bBA1y8"
  }
];
let currentMovies = movies;
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let selectedModalMovie = null;
const movieGrid = document.getElementById("popularGrid");
const trendingGrid = document.getElementById("trendingGrid");

renderMovies(movies, trendingGrid, getIcons(), favorites);

trendingGrid.addEventListener("click", (event) => {

  const clickedFavorite =
    event.target.closest(".movie-card__favorite");

  if (clickedFavorite) {

    const clickedCard =
      clickedFavorite.closest(".movie-card");

    const movieID = clickedCard.dataset.movieId;

    const isFavorite = favorites.some(
      id => id.toString() === movieID
    );

    if (isFavorite) {

      favorites = favorites.filter(
        id => id.toString() !== movieID
      );

      clickedFavorite.classList.remove("is-favorite");
      clickedFavorite.ariaPressed = "false";

    } else {

      favorites.push(movieID);

      clickedFavorite.classList.add("is-favorite");
      clickedFavorite.ariaPressed = "true";
    }

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );

    syncHeroFavorite();
    renderFavorites();

    return;
  }


  const clickedCard =
    event.target.closest(".movie-card");

  if (!clickedCard) return;

  const movieID =
    clickedCard.dataset.movieId;

  const selectedMovie = movies.find(
    movie => movie.id.toString() === movieID
  );

  if (!selectedMovie) return;

  openMovieModal(selectedMovie);

});



renderMovies(movies, movieGrid, getIcons(), favorites);

function closeModal() {
   gsap.to(modal, {
    opacity: 0,
    scale: 0.95,
    duration: 0.2,
    onComplete: function () {
      modalOverlay.classList.add("hidden");
      gsap.set(modal, {
        clearProps: "opacity,transform"
      });
    }
  });
}

const modal = document.getElementById("movieModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalFavoriteBtn = document.getElementById("modalFavoriteBtn");

function syncModalFavorite() {
  const isFavorite = favorites.some(
    id => id.toString() === selectedModalMovie.id.toString()
  );

  modalFavoriteBtn.classList.toggle("is-favorite", isFavorite);
  modalFavoriteBtn.setAttribute(
    "aria-pressed",
    isFavorite ? "true" : "false"
  );
  modalFavoriteBtn.setAttribute(
    "aria-label",
    isFavorite ? "Remove from favorites" : "Add to favorites"
  );
}

function openMovieModal(movie) {
  selectedModalMovie = movie;

  document.getElementById("modalTitle").textContent = movie.title;
  document.getElementById("modalYear").textContent = movie.year;
  document.getElementById("modal_Rating").textContent = movie.rating;
  document.getElementById("modalGenre").textContent = movie.genre;
  document.getElementById("modalDescription").textContent = movie.description;
  document.getElementById("modalPoster").src = movie.image;

  document.getElementById("modalWatchBtn").onclick = function () {
    window.location.href = `movie-details.html?id=${movie.id}`;
  };

  syncModalFavorite();
  modalOverlay.classList.remove("hidden");
  gsap.from(modal, {
    opacity: 0,
    scale: 0.95
  });
}

modalFavoriteBtn.addEventListener("click", function () {
  if (!selectedModalMovie) return;

  const movieId = selectedModalMovie.id.toString();
  const isFavorite = favorites.some(
    id => id.toString() === movieId
  );

  favorites = isFavorite
    ? favorites.filter(id => id.toString() !== movieId)
    : [...favorites, selectedModalMovie.id];

  localStorage.setItem("favorites", JSON.stringify(favorites));
  syncModalFavorite();
  renderMovies(movies, trendingGrid, getIcons(), favorites);
  renderMovies(currentMovies, movieGrid, getIcons(), favorites);
  syncHeroFavorite();
  renderFavorites();
});

if (movieGrid) {
movieGrid.addEventListener("click", (event) => {
  const clickedFavorite = event.target.closest(".movie-card__favorite");

  if (clickedFavorite) {
    event.stopPropagation();
    return;
  }

  const clickedCard = event.target.closest(".movie-card");

  if (!clickedCard) return;

  const movieID = clickedCard.dataset.movieId;

  const selectedMovie = currentMovies.find(
    (movie) => movie.id.toString() === movieID
  );

  if (!selectedMovie) return;

  openMovieModal(selectedMovie);
});
}




  modalClose.addEventListener("click", function () {
    closeModal();
  });


     modalOverlay.addEventListener("click",function(event){
       if (event.target===modalOverlay)
          closeModal();
     });
     
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

const filter = document.querySelectorAll(".genre-chip");
 filter.forEach( currentChip => {
    currentChip.addEventListener("click", function (filterGenre) {
       const filtered= filterGenre.target;
      selectedGenre = filtered.dataset.genre;
      console.log("Chip genre:", selectedGenre);
       applyFilters();
    });
 });
 const search = document.getElementById("searchInput");

search.addEventListener("input", function () {
  applyFilters();
});
 movieGrid.addEventListener("click",function(event){
     const FavSelect = event.target.closest(".movie-card__favorite");

     if (FavSelect) {
     const favCard =   FavSelect.closest(".movie-card");
    const favId = favCard.dataset.movieId;
    const favMovie = movies.find( movie=> movie.id===favId);
    const alreadyFavorite = favorites.some(item => item ===favId);
    if (!alreadyFavorite) {
        favorites.push(favId);
FavSelect.ariaPressed = "true";
FavSelect.classList.add("is-favorite");
    } 
    else{
        favorites = favorites.filter(item => item !== favId);
FavSelect.ariaPressed = "false";
FavSelect.classList.remove("is-favorite");
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    syncHeroFavorite();
}
 });

const favoritesGrid = document.getElementById("favoritesGrid");

async function renderFavorites() {

  const missingIds = favorites.filter(favId =>
    !currentMovies.some(movie =>
      movie.id.toString() === favId.toString()
    ) &&
    !isNaN(favId)
  );

  for (const favId of missingIds) {

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${favId}?api_key=${API_KEY}`
    );

    const movie = await response.json();

    const convertedMovie = {
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
      genre: movie.genres
        .map(genre => genre.name.toLowerCase())
        .join(", ")
    };

    currentMovies.push(convertedMovie);
  }

  const allMovies = [...currentMovies, ...movies];

const filterFav = allMovies.filter(item =>
  favorites.some(favId =>
    item.id.toString() === favId.toString()
  )
);
  

  if (favorites.length === 0) {

    favoritesGrid.innerHTML = "";

    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No favorites yet.";

    favoritesGrid.append(emptyMessage);

  } else {

    renderMovies(
      filterFav,
      favoritesGrid,
      getIcons(),
      favorites
    );
  }
}
  
 const favoritesLink = document.querySelector("#favoritesLink");
 const mainMovieSection = document.querySelector("#popular");
 const favSection = document.querySelector("#favorites");
 favSection.classList.add("hidden");
 favoritesLink.addEventListener("click", function () {
    
  mainMovieSection.classList.add("hidden");
   favSection.classList.remove("hidden");
  renderFavorites();
   setActiveLink(favoritesLink);
});
favoritesGrid.addEventListener("click", function (event) {
    const clickedFavorite = event.target.closest(".movie-card__favorite");
      
if (!clickedFavorite) return;
   const clickedCard = clickedFavorite.closest(".movie-card");
   const fav_Id = clickedCard.dataset.movieId;
  favorites = favorites.filter(
  item => item.toString() !== fav_Id.toString()
);

localStorage.setItem("favorites", JSON.stringify(favorites));

clickedCard.remove();

renderMovies(currentMovies, movieGrid, getIcons(), favorites);
renderMovies(movies, trendingGrid, getIcons(), favorites);
syncHeroFavorite();
renderFavorites();

});
const homeLink = document.querySelector("#home");

homeLink.addEventListener("click", function () {
  favSection.classList.add("hidden");
  mainMovieSection.classList.remove("hidden");
   setActiveLink(homeLink);
});
function setActiveLink(activeLink) {
  document.querySelectorAll(".navbar__link").forEach(link => {
    link.classList.remove("navbar__link--active");
  });

  activeLink.classList.add("navbar__link--active");
}
let selectedGenre = "all";
function applyFilters() {
 
  const searchValue = search.value.toLowerCase();
  const sortValue = sortMovies.value;

 const filteredMovies = currentMovies.filter(movie => {
    const genreMatch =
  selectedGenre === "all" ||
  movie.genre.split(", ").includes(selectedGenre);

    const searchMatch =
      movie.title.toLowerCase().includes(searchValue);

    return genreMatch && searchMatch;
  });
     const emptyState = document.getElementById("emptyState");
  const sortedMovies = [...filteredMovies];
    if (filteredMovies.length === 0) {
  emptyState.classList.remove("hidden");
} else {
  emptyState.classList.add("hidden");
}
  if (sortValue === "ratingHigh") {
    sortedMovies.sort((a, b) => b.rating - a.rating);
  }

  if (sortValue === "ratingLow") {
    sortedMovies.sort((a, b) => a.rating - b.rating);
  }

  if (sortValue === "newest") {
    sortedMovies.sort((a, b) => b.year - a.year);
  }

  if (sortValue === "oldest") {
    sortedMovies.sort((a, b) => a.year - b.year);
  }
  renderMovies(
  sortedMovies,
  movieGrid,
  getIcons(),
  favorites
);
}
const sortMovies = document.getElementById("sortMovies");
sortMovies.addEventListener("change", function () {
 applyFilters();

});
 const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", function () {
  navLinks.classList.toggle("is-open");
});


 

  fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
  .then(response => response.json())
  .then(data => {

    const genreMap = {};

    data.genres.forEach(genre => {
      genreMap[genre.id] = genre.name;
    });

  

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {

        const apiMovies = data.results.map(movie =>
  convertMovie(movie, genreMap)
);

        
        currentMovies = apiMovies;
        

        renderMovies(apiMovies, movieGrid, getIcons(), favorites);
      });

  });
 

const hero = document.getElementById("hero");
const heroPlayBtn = document.getElementById("heroPlayBtn");
const heroFavoriteBtn = document.getElementById("heroFavoriteBtn");

heroPlayBtn.addEventListener("click", function () {

  const heroMovieID = hero.dataset.heroMovieId;

  const selectedMovie = movies.find(
    movie => movie.id.toString() === heroMovieID
  );

  if (!selectedMovie) return;

  openMovieModal(selectedMovie);
});

function syncHeroFavorite() {

  const heroMovieID = hero.dataset.heroMovieId;

  const isFavorite = favorites.some(
    id => id.toString() === heroMovieID
  );

  heroFavoriteBtn.classList.toggle("is-favorite", isFavorite);
  heroFavoriteBtn.setAttribute(
    "aria-pressed",
    isFavorite ? "true" : "false"
  );
}

heroFavoriteBtn.addEventListener("click", function () {

  const heroMovieID = hero.dataset.heroMovieId;

  const isFavorite = favorites.some(
    id => id.toString() === heroMovieID.toString()
  );

  if (isFavorite) {

    favorites = favorites.filter(
      id => id.toString() !== heroMovieID.toString()
    );

    heroFavoriteBtn.setAttribute("aria-pressed", "false");

  } else {

    favorites.push(heroMovieID);

    heroFavoriteBtn.setAttribute("aria-pressed", "true");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  syncHeroFavorite();
  renderMovies(movies, trendingGrid, getIcons(), favorites);
renderFavorites();


});
if (
  favorites.some(
    id => id.toString() === hero.dataset.heroMovieId
  )
) {
  heroFavoriteBtn.classList.add("is-favorite");
  heroFavoriteBtn.setAttribute("aria-pressed", "true");
}
const moviesLink = document.querySelector('.navbar__link[href="#popular"]');

moviesLink.addEventListener("click", function (event) {
  event.preventDefault();

  favSection.classList.add("hidden");
  mainMovieSection.classList.remove("hidden");
  setActiveLink(moviesLink);

  mainMovieSection.scrollIntoView({ behavior: "smooth" });
});

const genresLink = document.querySelector('.navbar__link[href="#genres"]');

genresLink.addEventListener("click", function () {
  setActiveLink(genresLink);
});
