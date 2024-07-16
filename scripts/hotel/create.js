// Import axios correctly
const axios = require('axios');

// Function to create a hotel
async function createHotel(hotelName, hotelLocation, pricePerNight, availableRooms) {
    try {
        // Define the URL of your API endpoint
        const url = 'http://localhost/FLYTEER_BACKEND/flyteer_backend/api/hotel/create.php';

        // Create the data object
        const data = {
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
        console.error('Error creating hotel:', error);
        throw error;
    }
}

// Example usage of the createHotel function
createHotel('Kempenski', 'Beirut, LB', 170, 190)
    .then(response => {
        // Handle the successful response
        console.log('Hotel created successfully:', response);
    })
    .catch(error => {
        // Handle any errors
        console.error('Error:', error);
    });
