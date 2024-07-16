// bookFlight.js

function bookFlight(flightId) {
    localStorage.setItem('selectedFlightId', flightId);
    window.location.href = 'flight_booking_details.html';
}
