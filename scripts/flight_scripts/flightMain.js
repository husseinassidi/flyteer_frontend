// flightMain.js - Contains DOM manipulation and event handling for flights

// Import CRUD functions for flights
import getFlights   from '/flyteer_frontend/scripts/flight_scripts/getFlights.js';
import getFlight from '/flyteer_frontend/scripts/flight_scripts/getFlight.js';

document.addEventListener('DOMContentLoaded', function() {
    // Event listener for filter button
    document.querySelector('.filter-button').addEventListener('click', function() {
        const from = document.querySelector('#from').value;
        const to = document.querySelector('#to').value;
        const date = document.querySelector('#date').value;
        const price = document.querySelector('#price').value;
        filterFlights(from, to, date, price);
    });

    // Function to filter flights
    async function filterFlights(from, to, date, price) {
        try {
            const response = await getFlights();
            const data = response;

            const filteredFlights = data.filter(flight => {
                return (from === '' || flight.departure_airport.includes(from)) &&
                       (to === '' || flight.arrival_airport.includes(to)) &&
                       (date === '' || flight.departure_time.includes(date)) &&
                       (price === '' || flight.price <= price);
            });
            displayFlights(filteredFlights);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Function to display flights
    function displayFlights(flights) {
        const resultsContainer = document.querySelector('#results-container');
        resultsContainer.innerHTML = '';
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
            resultsContainer.appendChild(flightDiv);
        });
    }

    // Event listener for book buttons
    document.querySelector('#results-container').addEventListener('click', function(event) {
        if (event.target.classList.contains('book-button')) {
            const flightId = event.target.getAttribute('data-id');
            localStorage.setItem('selectedFlightId', flightId);
            window.location.href = 'flight_details.html';
        }
    });

    // If on flight details page
    if (window.location.pathname.endsWith('flight_details.html')) {
        const flightId = localStorage.getItem('selectedFlightId');

        (async function() {
            try {
                const response = await getFlight(flightId);
                displayFlightDetails(response);
            } catch (error) {
                console.error('Error:', error);
            }
        })();

        function displayFlightDetails(flight) {
            var flightDetailsContainer = document.getElementById('flight-details-container');
            flightDetailsContainer.innerHTML = `
                <p>From: ${flight.departure_airport}</p>
                <p>To: ${flight.arrival_airport}</p>
                <p>Departure: ${flight.departure_time}</p>
                <p>Arrival: ${flight.arrival_time}</p>
                <p>Price: $${flight.price}</p>
            `;
        }
    }
});
