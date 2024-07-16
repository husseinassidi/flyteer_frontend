// Import axios
const axios = require('axios');

// Function to get a flight booking by ID
async function readOneFlightBooking(bookingId) {
    try {
        const url = 'http://localhost/FlyteerBackend/flyteer_backend/api/booking/flight/readOne.php';
        const data = {
            booking_id: bookingId
        };
        const response = await axios.post(url, data);
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting flight booking:', error);
        throw error;
    }
}

// Example usage
readOneFlightBooking(1)
    .then(response => {
        console.log('Flight booking details retrieved successfully:', response);
    })
    .catch(error => {
        console.error('Error:', error);
    });
