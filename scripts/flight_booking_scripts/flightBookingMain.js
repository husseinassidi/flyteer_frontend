// flightBookingMain.js - Contains DOM manipulation and event handling for flight bookings

// Import CRUD functions for flight bookings
import createFlightBooking  from './flight_booking_scripts/create.js';
import deleteFlightBooking  from './flight_booking_scripts/delete.js';


document.addEventListener('DOMContentLoaded', function() {
    // If on flight details page and confirming a booking
    if (window.location.pathname.endsWith('flight_details.html')) {
        document.querySelector('.confirm-button').addEventListener('click', function() {
            const flightId = localStorage.getItem('selectedFlightId');
            confirmBooking(flightId);
        });

        function confirmBooking(flightId) {
            const userId = 1; // Example user ID, should be dynamic in a real application
            const data = {
                user_id: userId,
                flight_id: flightId
            };

            createFlightBooking(data)
                .then(response => {
                    showPopup();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

        function showPopup() {
            document.getElementById('booking-popup').style.display = 'block';
        }

        document.querySelector('.close-button').addEventListener('click', function() {
            closePopup();
        });

        function closePopup() {
            document.getElementById('booking-popup').style.display = 'none';
        }

        document.querySelector('#booking-popup button').addEventListener('click', function() {
            deleteBooking();
        });

        function deleteBooking() {
            const bookingId = 1; // Example booking ID, should be dynamic in a real application
            const data = {
                booking_id: bookingId
            };

            deleteFlightBooking(data)
                .then(response => {
                    closePopup();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }
});
