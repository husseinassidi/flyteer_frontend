// Import axios
// import axios from 'axios'
// Function to create a flight booking
async function createFlightBooking(userId, flightId) {
    try {
        const url = 'http://localhost/FlyteerBackend/flyteer_backend/api/booking/flight/create.php';
        const data = {
            user_id: userId,
            flight_id: flightId
        };
        const response = await axios.post(url, data);
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating flight booking:', error);
        throw error;
    }
}

export default createFlightBooking;


// Example usage
createFlightBooking(1, 1)
    .then(response => {
        console.log('Flight booking created successfully:', response);
    })
    .catch(error => {
        console.error('Error:', error);
    });
