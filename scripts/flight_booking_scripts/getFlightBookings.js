// Import axios
import axios from 'axios'
// Function to read flight bookings
async function readFlightBookings() {
    try {
        const url = 'http://localhost/FlyteerBackend/flyteer_backend/api/booking/flight/read.php';
        const response = await axios.get(url);
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error reading flight bookings:', error);
        throw error;
    }
}

// Example usage
readFlightBookings()
    .then(response => {
        console.log('Flight bookings retrieved successfully:', response);
    })
    .catch(error => {
        console.error('Error:', error);
    });
