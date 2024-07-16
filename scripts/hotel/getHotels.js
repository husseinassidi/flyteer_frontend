// import axios from 'axios'; // Import axios using ES module syntax

// Function to get hotels
export default async function getHotels() {
    try {
        const url = 'http://localhost/FLYTEER_BACKEND/flyteer_backend/api/hotel/getHotels.php';
        const response = await axios.get(url);
        // console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching hotels:', error);
        throw error;
    }
}

// Example usage
getHotels()
    .then(response => {
        console.log('Hotels retrieved successfully:', response);
    })
    .catch(error => {
        console.error('Error:', error);
    });
