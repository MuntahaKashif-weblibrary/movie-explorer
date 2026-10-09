 🎬  Movie Explorer

Reelhouse is a modern, responsive movie explorer built with **HTML, CSS, and JavaScript**. It uses the **TMDB API** to dynamically fetch movies and provides an interactive experience for discovering, filtering, sorting, and saving movies.

## ✨ Features

* 🎥 Dynamic movie data powered by TMDB API
* 🔎 Search movies by title
* 🎭 Filter movies by genre
* ↕️ Sort movies by rating and release year
* ❤️ Add/remove movies from Favorites
* 💾 Favorites saved using `localStorage`
* 🏠 Home and Movies navigation
* 🔥 Trending Now section
* 🌸 Genre navigation with smooth scrolling
* 🎬 Movie details page
* ▶️ Watch trailer functionality
* 👥 Movie cast information
* 🖼️ Movie posters and detailed information
* 📱 Responsive design for desktop and mobile
* 🍔 Mobile navigation menu
* ✨ GSAP modal animations
* 🧩 Reusable movie rendering functions
* 📭 Empty states for sections without content

## 🛠️ Technologies Used

* **HTML5**
* **CSS3**
* **JavaScript (ES6+)**
* **TMDB API**
* **LocalStorage**
* **GSAP**

## 📂 Project Structure


Movie-Explorer/
│
├── index.html
├── movie-details.html
│
├── css/
│   ├── style.css
│   └── movie-page.css
│
├── js/
│   ├── script.js
│   ├── movie-details.js
│   ├── api.js
│   └── render.js
│
├── images/
│   └── movie posters and assets
│
└── README.md


> Update the file names above if your actual project structure uses different names.

## 🚀 How It Works

Reelhouse combines locally defined movie data with dynamically fetched TMDB data.

The main movie grid uses TMDB data, while the Trending Now section uses selected local movie data.

Users can:

1. Browse movies
2. Search for a movie
3. Filter by genre
4. Sort movies
5. Open a movie modal
6. Add movies to Favorites
7. View detailed movie information
8. Watch trailers
9. Explore cast information

Favorites are stored in the browser using `localStorage`, so they remain available when the page is refreshed.

## 🔑 TMDB API

Reelhouse uses the **TMDB API** to fetch movie information such as:

* Movie titles
* Posters
* Ratings
* Release dates
* Genres
* Descriptions
* Cast information

You need your own TMDB API key to run the project locally.

## 💻 Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Open the project

Open the project folder in your code editor.

### 3. Add your TMDB API key

Add your TMDB API key where the project expects `API_KEY`.

### 4. Run the project

Open `index.html` using a local development server such as **Live Server**.

## 📱 Responsive Design

Reelhouse is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

The navigation and movie layout adapt to smaller screen sizes with a mobile hamburger menu.

## 🎯 Project Goals

This project was built to practice and demonstrate:

* DOM manipulation
* JavaScript event handling
* API integration
* Dynamic rendering
* Filtering and sorting
* LocalStorage
* Responsive UI development
* Reusable JavaScript functions
* Multi-page navigation
* Modal interactions
* Working with external APIs

## 🔮 Future Improvements

Possible future improvements include:

* Pagination / infinite scrolling
* Advanced movie recommendations
* User authentication
* More detailed movie information
* Improved loading states
* Additional TMDB categories

## 👩‍💻 Author

**MuNtAhA KaShiF**

Frontend development project built as part of my journey toward becoming a stronger web developer.

---

### 🎬 Reelhouse V2

**Discover. Explore. Save your favorites.**



