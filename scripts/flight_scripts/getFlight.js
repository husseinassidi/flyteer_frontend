// Import axios
import axios from 'axios'
// Function to get a flight by ID using POST request
async function getFlight(flightId) {
    try {
        // Define the URL of your API endpoint
        const url = 'http://localhost/FLYTEER_BACKEND/flyteer_backend/api/flight/readOne.php';

        // Create the data object
        const data = {
            flight_id: flightId
        };

        // Make the POST request using Axios
        const response = await axios.post(url, data);

        // Handle the response
        console.log('Response:', response.data);
        return response.data;

    } catch (error) {
        // Handle the error
        console.error('Error retrieving flight:', error);
        throw error;
    }
}

// Example usage of the getFlight function
getFlight(1)
    .then(response => {
        // Handle the successful response
        console.log('Flight details retrieved successfully:', response);
    })
    .catch(error => {
        // Handle any errors
        console.error('Error:', error);
    });
