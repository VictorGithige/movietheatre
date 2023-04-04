// Get references to HTML elements
const movieTitle = document.getElementById("movie-title");
const moviePoster = document.getElementById("movie-poster");
const movieRuntime = document.getElementById("movie-runtime");
const movieShowtime = document.getElementById("movie-showtime");
const movieTickets = document.getElementById("movie-tickets");
const buyTicketButton = document.getElementById("buy-ticket");
const filmsList = document.getElementById("films");

// Make GET request to /films/1 endpoint to get movie details
fetch("/films/1")
  .then(response => response.json())
  .then(movie => {
    // Update movie details on the page
    movieTitle.textContent = movie.title;
    moviePoster.src = movie.poster;
    movieRuntime.textContent = movie.runtime;
    movieShowtime.textContent = movie.showtime;
    const availableTickets = movie.capacity - movie.tickets_sold;
    movieTickets.textContent = availableTickets;

    // Add event listener to Buy Ticket button
    buyTicketButton.addEventListener("click", () => {
      if (availableTickets > 0) {
        availableTickets--;
        movieTickets.textContent = availableTickets;
      } else {
        alert("Sorry, this showing is sold out.");
      }
    });
  })
  .catch(error => console.log(error));

// Make GET request to /films endpoint to get all movies
fetch("/films")
  .then(response => response.json())
  .then(films => {
    // Remove placeholder film from films list
    filmsList.innerHTML = "";

    // Add each film to the films list
    films.forEach(film => {
      const li = document.createElement("li");
      li.classList.add("film", "item");
      li.textContent = film.title;
      filmsList.appendChild(li);
    });
  })
  .catch(error => console.log(error));
