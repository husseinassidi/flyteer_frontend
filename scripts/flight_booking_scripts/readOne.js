// readOne.js

document.addEventListener('DOMContentLoaded', function() {
    var flightId = localStorage.getItem('selectedFlightId');

    fetch(`http://localhost/FlyteerBackend/flyteer_backend/api/flights/readOne.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ flight_id: flightId })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(flight => {
        displayFlightDetails(flight);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

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
