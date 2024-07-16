// const axios = require('axios/dist/browser/axios.cjs'); // browser
// const axios = require('axios/dist/node/axios.cjs'); // node

// Function to get hotels
export default async function getHotels() {
    try {
        // Define the URL of your API endpoint
        const url = 'http://localhost/FLYTEER_BACKEND/flyteer_backend/api/hotel/getHotels.php';

        // Make the GET request using Axios
        const response = await axios.get(url);

        // Handle the response
        console.log('Response:', response.data);
        return response.data;

    } catch (error) {
        // Handle the error
        console.error('Error fetching hotels:', error);
        throw error;
    }
}

// Example usage of the getHotels function
// getHotels()
//     .then(response => {
//         // Handle the successful response
//         console.log('Hotels retrieved successfully:', response);
//     })
//     .catch(error => {
//         // Handle any errors
//         console.error('Error:', error);
//     });



 const deisplayFilteredHotels = (getHotels)=>{
    
 }