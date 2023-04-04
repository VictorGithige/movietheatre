const filmsList = document.querySelector('#films');
const movieTitle = document.querySelector('#movie-title');
const runtime = document.querySelector('#runtime');
const showtime = document.querySelector('#showtime');
const availableTickets = document.querySelector('#available-tickets');
const poster = document.querySelector('#poster');
const buyTicketBtn = document.querySelector('#buy-ticket-btn');


// Make GET request to /films/1 endpoint
fetch(' http://localhost:3000/films/1')
  .then(response => response.json())
  .then(film => {
    // Populate movie details with data
    movieTitle.innerText = film.title;
    runtime.innerText = film.runtime + ' minutes';
    showtime.innerText = film.showtime;
    availableTickets.innerText = film.capacity - film.tickets_sold;
    poster.src = film.poster;
 })


 // Make GET request to /films endpoint
fetch('http://localhost:3000/films')
  .then(response => response.json())
  .then(data => {
    // Populate films list with data
    for (let film of data) {
      const li = document.createElement('li');
      li.classList.add('film', 'item');
      li.innerText = film.title;
      li.addEventListener('click', () => {
        // Update movie details when film is clicked
        movieTitle.innerText = film.title;
        runtime.innerText = film.runtime + ' minutes';
        showtime.innerText = film.showtime;
        availableTickets.innerText = film.capacity - film.tickets_sold;
        poster.src = film.poster;
      });
      filmsList.appendChild(li);
    }
  })


 // Add click event listener to Buy Ticket button
buyTicketBtn.addEventListener('click', () => {
  const ticketsRemaining = (availableTickets.innerText);
  if (ticketsRemaining > 0) {
    availableTickets.innerText = ticketsRemaining - 1;
    alert('Thank you for your purchase!');
  } else {
    buyTicketBtn.disabled = true;
  }
});
	
