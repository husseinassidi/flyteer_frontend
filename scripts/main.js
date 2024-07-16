// DOM Manipulation and Event Listeners for Flights and FlightBookings

// Function to filter flights based on criteria
async function filterFlights() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;
    const price = document.getElementById('price').value;

    const url = 'http://localhost/FLYTEER_BACKEND/flyteer_backend/api/flights/read.php';
    const response = await fetch(url);
    const flights = await response.json();

    const filteredFlights = flights.filter(flight => {
        return (!from || flight.departure_airport.includes(from)) &&
               (!to || flight.arrival_airport.includes(to)) &&
               (!date || flight.departure_time.includes(date)) &&
               (!price || flight.price <= price);
    });

    displayFlights(filteredFlights);
}

// Function to display flights
function displayFlights(flights) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    flights.forEach(flight => {
        const flightDiv = document.createElement('div');
        flightDiv.className = 'flight';

        flightDiv.innerHTML = `
            <p>From: ${flight.departure_airport}</p>
            <p>To: ${flight.arrival_airport}</p>
            <p>Departure: ${flight.departure_time}</p>
            <p>Arrival: ${flight.arrival_time}</p>
            <p>Price: $${flight.price}</p>
            <button onclick="bookFlight(${flight.flight_id})">Book</button>
        `;

        resultsContainer.appendChild(flightDiv);
    });
}

// Function to book a flight
function bookFlight(flightId) {
    localStorage.setItem('selectedFlightId', flightId);
    window.location.href = 'flight_details.html';
}

// Function to read and display a single flight's details
async function readOneFlight() {
    const flightId = localStorage.getItem('selectedFlightId');
    const url = `http://localhost/FLYTEER_BACKEND/flyteer_backend/api/flights/readOne.php?flight_id=${flightId}`;

    const response = await fetch(url);
    const flight = await response.json();

    displayFlightDetails(flight);
}

function displayFlightDetails(flight) {
    const flightDetailsContainer = document.getElementById('flight-details-container');
    flightDetailsContainer.innerHTML = `
        <p>From: ${flight.departure_airport}</p>
        <p>To: ${flight.arrival_airport}</p>
        <p>Departure: ${flight.departure_time}</p>
        <p>Arrival: ${flight.arrival_time}</p>
        <p>Price: $${flight.price}</p>
    `;
}

// Function to confirm a booking
async function confirmBooking() {
    const flightId = localStorage.getItem('selectedFlightId');
    const userId = 1; // Example user ID, change as needed

    const url = 'http://localhost/FLYTEER_BACKEND/flyteer_backend/api/booking/flight/create.php';
    const data = {
        user_id: userId,
        flight_id: flightId
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result.success) {
        showPopup('Flight Booked');
    } else {
        alert('Booking failed');
    }
}

// Function to show popup
function showPopup(message) {
    const popup = document.getElementById('booking-popup');
    const popupContent = popup.querySelector('.popup-content p');
    popupContent.textContent = message;
    popup.style.display = 'block';
}

// Function to delete a booking
async function deleteBooking() {
    const flightId = localStorage.getItem('selectedFlightId');
    const userId = 1; // Example user ID, change as needed

    const url = 'http://localhost/FLYTEER_BACKEND/flyteer_backend/api/booking/flight/delete.php';
    const data = {
        user_id: userId,
        flight_id: flightId
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result.success) {
        closePopup();
        alert('Booking deleted');
    } else {
        alert('Delete failed');
    }
}

// Function to close the popup
function closePopup() {
    document.getElementById('booking-popup').style.display = 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('results-container')) {
        document.querySelector('.filter-button').addEventListener('click', filterFlights);
    }

    if (document.getElementById('flight-details-container')) {
        readOneFlight();
        document.querySelector('.confirm-button').addEventListener('click', confirmBooking);
    }
});
