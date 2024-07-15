const axios = require('axios');

// API endpoint
const apiUrl = 'http://localhost/FLYTEER_BACKEND/flyteer_backend/api/booking/hotel/read.php';

// Function to test the API
async function testApi() {
    try {
        // Send GET request
        const response = await axios.get(apiUrl);
        // Log response data
        // console.log('Response data:', response.data);
        console.log(response.data.records[1])

    } catch (error) {
        // Handle errors and log the error message
        console.error('Error:', error.message);
    }
}

// Run the test
testApi();
