// Import axios
// import axios from '/axios';

// Function to get a hotel by ID using POST request
export default async function getHotel(hotelId) {
    try {
        // Define the URL of your API endpoint
        const url = 'http://localhost/FLYTEER_BACKEND/flyteer_backend/api/hotel/getHotel.php';

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
        console.error('Error retrieving hotel:', error);
        throw error;
    }
}
