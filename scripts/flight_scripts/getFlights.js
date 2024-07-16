// Import axios
const axios = require('axios');

// Function to get flights
async function getFlights() {
    try {
        const url = 'http://localhost/FLYTEER_BACKEND/flyteer_backend/api/flight/read.php';
        const response = await axios.get(url);
        // console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching flights:', error);
        throw error;
    }
}

// Example usage
getFlights()
    .then(response => {
        console.log('Flights retrieved successfully:', response);
    })
    .catch(error => {
        console.error('Error:', error);
    });
