// main.js - Contains DOM manipulation and event handling

document.addEventListener('DOMContentLoaded', function() {
    // Event listener for filter button
    document.querySelector('.filter-button').addEventListener('click', function() {
        const from = document.querySelector('input[placeholder="From Where?"]').value;
        const to = document.querySelector('input[placeholder="To Where?"]').value;
        const date = document.querySelector('input[type="date"]').value;
        const price = document.querySelector('input[type="range"]').value;
        filterFlights(from, to, date, price);
    });

    // Function to filter flights
    function filterFlights(from, to, date, price) {
        fetch('http://localhost/FlyteerBackend/flyteer_backend/api/flights/read.php')
            .then(response => response.json())
            .then(data => {
                const filteredFlights = data.filter(flight => {
                    return (from === '' || flight.departure_airport.includes(from)) &&
                           (to === '' || flight.arrival_airport.includes(to)) &&
                           (date === '' || flight.departure_time.includes(date)) &&
                           (price === '' || flight.price <= price);
                });
                displayFlights(filteredFlights);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Function to display flights
    function displayFlights(flights) {
        const flightContainer = document.querySelector('.results-container');
        flightContainer.innerHTML = '';
        flights.forEach(flight => {
            const flightDiv = document.createElement('div');
            flightDiv.classList.add('flight');
            flightDiv.innerHTML = `
                <p>From: ${flight.departure_airport}</p>
                <p>To: ${flight.arrival_airport}</p>
                <p>Departure: ${flight.departure_time}</p>
                <p>Arrival: ${flight.arrival_time}</p>
                <p>Price: $${flight.price}</p>
                <button class="book-button" data-id="${flight.flight_id}">Book</button>
            `;
            flightContainer.appendChild(flightDiv);
        });
    }

    // Event listener for book buttons
    document.querySelector('.results-container').addEventListener('click', function(event) {
        if (event.target.classList.contains('book-button')) {
            const flightId = event.target.getAttribute('data-id');
            localStorage.setItem('selectedFlightId', flightId);
            window.location.href = 'flight_details.html';
        }
    });
});
