// Import axios correctly
const axios = require('axios');

// Function to update a hotel
async function updateHotel(hotelId, hotelName, hotelLocation, pricePerNight, availableRooms) {
    try {
        // Define the URL of your API endpoint
        const url = 'http://localhost/FLYTEER_BACKEND/flyteer_backend/api/hotel/update.php';

        // Create the data object
        const data = {
            hotel_id: hotelId,
            hotel_name: hotelName,
            hotel_location: hotelLocation,
            price_per_night: pricePerNight,
            available_rooms: availableRooms
        };

        // Make the POST request using Axios
        const response = await axios.post(url, data);

        // Handle the response
        console.log('Response:', response.data);
        return response.data;

    } catch (error) {
        // Handle the error
        console.error('Error updating hotel:', error);
        throw error;
    }
}

// Example usage of the updateHotel function
updateHotel(4, 'Updated Hotel Name', 'Updated Location', 200, 15)
    .then(response => {
        // Handle the successful response
        console.log('Hotel updated successfully:', response);
    })
    .catch(error => {
        // Handle any errors
        console.error('Error:', error);
    });
