const detailsFavoriteBtn = document.getElementById("detailsFavoriteBtn");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const params = new URLSearchParams(window.location.search);

const selectedMovieID = params.get("id");

console.log(selectedMovieID);

const localMovies = [
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

const localMovie = localMovies.find(
  movie => movie.id === selectedMovieID
);

console.log("LOCAL MOVIE:", localMovie);

if (localMovie) {

  console.log("THIS IS A LOCAL MOVIE");

  const detailsPoster = document.getElementById("detailsPoster");
  const detailsGenre = document.getElementById("detailsGenre");
  const detailsTitle = document.getElementById("detailsTitle");
  const detailsYear = document.getElementById("detailsYear");
  const detailsRating = document.getElementById("detailsRating");
  const detailsDescription =
    document.getElementById("detailsDescription");

  detailsPoster.src = localMovie.image;
  detailsPoster.alt = localMovie.title;

  detailsGenre.textContent = localMovie.genre;
  detailsTitle.textContent = localMovie.title;
  detailsYear.textContent = localMovie.year;
  detailsRating.textContent = `⭐ ${localMovie.rating}`;
  detailsDescription.textContent = localMovie.description;


  const movieId = localMovie.id.toString();

if (
  favorites.some(
    id => id.toString() === movieId
  )
) {
  detailsFavoriteBtn.textContent =
    "Remove from Favorites";
} else {
  detailsFavoriteBtn.textContent =
    "Add to Favorites";
}

  detailsFavoriteBtn.addEventListener("click", () => {

    const movieId = localMovie.id.toString();

    if (favorites.some(id => id.toString() === movieId)) {

      favorites = favorites.filter(
        id => id.toString() !== movieId
      );

      detailsFavoriteBtn.textContent = "Add to Favorites";

    } else {

      favorites.push(localMovie.id);

      detailsFavoriteBtn.textContent = "Remove from Favorites";
    }

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );

    console.log("DETAILS FAVORITES:", favorites);
  });

} else {

  console.log("THIS IS A TMDB MOVIE");

  fetch(
    `https://api.themoviedb.org/3/movie/${selectedMovieID}?api_key=${API_KEY}`
  )
    .then(response => response.json())
    .then(data => {

      console.log("MOVIE DETAILS:", data);

      const detailsPoster =
        document.getElementById("detailsPoster");

      const detailsGenre =
        document.getElementById("detailsGenre");

      const detailsTitle =
        document.getElementById("detailsTitle");

      const detailsYear =
        document.getElementById("detailsYear");

      const detailsRating =
        document.getElementById("detailsRating");

      const detailsDescription =
        document.getElementById("detailsDescription");

      detailsPoster.src = data.poster_path
        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
        : "images/placeholder.jpg";

      detailsPoster.alt = data.title;

      detailsGenre.textContent = data.genres
        .map(genre => genre.name)
        .join(", ");

      detailsTitle.textContent = data.title;

      detailsYear.textContent = data.release_date
        ? data.release_date.split("-")[0]
        : "N/A";

      detailsRating.textContent =
        `⭐ ${data.vote_average}`;

      detailsDescription.textContent =
        data.overview || "No description available.";


        const movieId = data.id.toString();

if (
  favorites.some(
    id => id.toString() === movieId
  )
) {
  detailsFavoriteBtn.textContent =
    "Remove from Favorites";
} else {
  detailsFavoriteBtn.textContent =
    "Add to Favorites";
}

      detailsFavoriteBtn.addEventListener("click", () => {

        const movieId = data.id.toString();

        if (
          favorites.some(
            id => id.toString() === movieId
          )
        ) {

          favorites = favorites.filter(
            id => id.toString() !== movieId
          );

          detailsFavoriteBtn.textContent =
            "Add to Favorites";

        } else {

          favorites.push(data.id);

          detailsFavoriteBtn.textContent =
            "Remove from Favorites";
        }

        localStorage.setItem(
          "favorites",
          JSON.stringify(favorites)
        );

        console.log(
          "DETAILS FAVORITES:",
          favorites
        );
      });
    });
}
  
if (localMovie) {
  console.log("LOCAL MOVIE TRAILER");

  const detailsTrailer =
    document.getElementById("detailsTrailer");

  const trailerFallback =
    document.getElementById("trailerFallback");

  const trailerLoading =
    document.getElementById("trailerLoading");

  if (localMovie.trailer) {
    detailsTrailer.src =
      `https://www.youtube.com/embed/${localMovie.trailer}?vq=hd1080`;

    trailerFallback.classList.add("hidden");
    trailerLoading.classList.remove("hidden");
  } else {
    detailsTrailer.src = "";

    trailerFallback.classList.remove("hidden");
    trailerLoading.classList.add("hidden");
  }

  detailsTrailer.addEventListener("load", () => {
    trailerLoading.classList.add("hidden");
  });

} else {

  fetch(
    `https://api.themoviedb.org/3/movie/${selectedMovieID}/videos?api_key=${API_KEY}`
  )
    .then(response => response.json())
    .then(data => {

      console.log("VIDEOS:", data);

      const trailer = data.results.find(
        video =>
          video.site === "YouTube" &&
          video.type === "Trailer"
      );

      const detailsTrailer =
        document.getElementById("detailsTrailer");

      const trailerFallback =
        document.getElementById("trailerFallback");

      const trailerLoading =
        document.getElementById("trailerLoading");

      if (trailer) {
        detailsTrailer.src =
          `https://www.youtube.com/embed/${trailer.key}?vq=hd1080`;

        trailerFallback.classList.add("hidden");
        trailerLoading.classList.remove("hidden");
      } else {
        detailsTrailer.src = "";

        trailerFallback.classList.remove("hidden");
        trailerLoading.classList.add("hidden");
      }

      detailsTrailer.addEventListener("load", () => {
        trailerLoading.classList.add("hidden");
      });
    });
}


  fetch(
    `https://api.themoviedb.org/3/movie/${selectedMovieID}/videos?api_key=${API_KEY}`
  )
    .then(response => response.json())
    .then(data => {

      console.log("VIDEOS:", data);

      const trailer = data.results.find(
        video =>
          video.site === "YouTube" &&
          video.type === "Trailer"
      );

      const detailsTrailer =
        document.getElementById("detailsTrailer");

      const trailerFallback =
        document.getElementById("trailerFallback");

      const trailerLoading =
        document.getElementById("trailerLoading");

      if (trailer) {

        detailsTrailer.src =
          `https://www.youtube.com/embed/${trailer.key}?vq=hd1080`;

        trailerFallback.classList.add("hidden");
        trailerLoading.classList.remove("hidden");

      } else {

        detailsTrailer.src = "";

        trailerFallback.classList.remove("hidden");
        trailerLoading.classList.add("hidden");
      }

      detailsTrailer.addEventListener("load", () => {
        trailerLoading.classList.add("hidden");
      });

      console.log("FIRST VIDEO:", data.results[0]);

      console.log(
        "ACTUAL TRAILER:",
        data.results.find(
          video =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        )
      );
    });



  
const castMovieID = localMovie
  ? localMovie.tmdbId
  : selectedMovieID;

    
  fetch(
  `https://api.themoviedb.org/3/movie/${castMovieID}/credits?api_key=${API_KEY}`
)
  .then(response => response.json())
  .then(data => {
    console.log("CAST:", data);
    const castGrid = document.getElementById("castGrid");
     console.log(
  "CAST DATA:",
  data.cast.slice(0, 8).map(actor => ({
    name: actor.name,
    character: actor.character,
    image: actor.profile_path
  }))
);
    const cast = data.cast.slice(0, 8);

    cast.forEach(actor => {

      const card = document.createElement("div");
      card.classList.add("cast-card");

      const image = document.createElement("img");

image.classList.add("cast-card__image", "is-loading");

image.src = actor.profile_path
  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
  : "https://placehold.co/185x278/1a1a1a/ffffff?text=No+Photo";

image.alt = actor.name;

image.addEventListener("load", () => {
  image.classList.remove("is-loading");
});

image.addEventListener("error", () => {
  image.src = "https://placehold.co/185x278/1a1a1a/ffffff?text=No+Photo";
  image.classList.remove("is-loading");
});

      const name = document.createElement("h3");
      name.textContent = actor.name;

      const character = document.createElement("p");
      character.textContent = actor.character;

      card.append(image, name, character);
      castGrid.append(card);
    });
  });
  const castGrid = document.getElementById("castGrid");
const castPrev = document.getElementById("castPrev");
const castNext = document.getElementById("castNext");

castNext.addEventListener("click", () => {
  castGrid.scrollBy({
    left: 350,
    behavior: "smooth"
  });
});

castPrev.addEventListener("click", () => {
  castGrid.scrollBy({
    left: -350,
    behavior: "smooth"
  });
  
  console.log("FIRST CAST:", data.cast[0]);
 
});


let genreMap = {};

fetch(
  `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
)
  .then(response => response.json())
  .then(data => {
    data.genres.forEach(genre => {
      genreMap[genre.id] = genre.name;
    });

    console.log(genreMap);
  });

  const relatedMovieID = localMovie
  ? localMovie.tmdbId
  : selectedMovieID;
fetch(
  `https://api.themoviedb.org/3/movie/${relatedMovieID}/similar?api_key=${API_KEY}`
)
  .then(response => response.json())
  .then(data => {

    console.log("SIMILAR:", data.results);

    const relatedMovies = data.results.slice(0, 8);
    const convertedMovies = relatedMovies.map(movie => {
  return convertMovie(movie, genreMap);
});
console.log(convertedMovies);

    const relatedGrid = document.getElementById("relatedGrid");

 const relatedIcons = createIcons();

renderMovies(convertedMovies, relatedGrid, relatedIcons);
  });
  relatedGrid.addEventListener("click", (event) => {
  const clickedCard = event.target.closest(".movie-card");

  if (!clickedCard) return;

  const movieID = clickedCard.dataset.movieId;

  window.location.href = `movie-details.html?id=${movieID}`;
});