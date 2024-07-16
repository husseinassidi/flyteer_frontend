// Import axios
import axios from 'axios'
// Function to update a flight booking
async function updateFlightBooking(bookingId, flightId, status) {
    try {
        const url = 'http://localhost/FlyteerBackend/flyteer_backend/api/booking/flight/update.php';
        const data = {
            booking_id: bookingId,
            flight_id: flightId,
            status: status
        };
        const response = await axios.post(url, data);
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating flight booking:', error);
        throw error;
    }
}

// Example usage
updateFlightBooking(1, 1, 'confirmed')
    .then(response => {
        console.log('Flight booking updated successfully:', response);
    })
    .catch(error => {
        console.error('Error:', error);
    });
