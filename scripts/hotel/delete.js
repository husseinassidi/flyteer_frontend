// Import axios
const axios = require('axios');

// Function to delete a hotel
async function deleteHotel(hotelId) {
    try {
        // Define the URL of your API endpoint
        const url = 'http://localhost/FLYTEER_BACKEND/flyteer_backend/api/hotel/delete.php';

        // Create the data object
        const data = {
            hotel_id: hotelId
        };

        // Make the POST request using Axios
        const response = await axios.post(url, data);

        // Handle the response
        console.log('Response:', response.data);
        return response.data;

    } catch (error) {
        // Handle the error
        console.error('Error deleting hotel:', error);
        throw error;
    }
}

// Example usage of the deleteHotel function
deleteHotel(3)
    .then(response => {
        // Handle the successful response
        console.log('Hotel deleted successfully:', response);
    })
    .catch(error => {
        // Handle any errors
        console.error('Error:', error);
    });
