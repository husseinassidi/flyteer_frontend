// Import axios
// import axios from 'axios'
// Function to delete a flight booking
async function deleteFlightBooking(bookingId) {
    try {
        const url = 'http://localhost/FlyteerBackend/flyteer_backend/api/booking/flight/delete.php';
        const data = {
            booking_id: bookingId
        };
        const response = await axios.post(url, data);
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting flight booking:', error);
        throw error;
    }
}
export default deleteFlightBooking;

// Example usage
deleteFlightBooking(1)
    .then(response => {
        console.log('Flight booking deleted successfully:', response);
    })
    .catch(error => {
        console.error('Error:', error);
    });
