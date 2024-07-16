// Import axios
// import axios from "axios";
// Function to create a hotel booking
export default async function createHotelBooking(userId, hotelId, checkInDate, checkOutDate, status) {
    try {
        // Define the URL of your API endpoint
        const url = 'http://localhost/FLYTEER_BACKEND/flyteer_backend/api/booking/hotel/create.php';

        // Create the data object
        const data = {
            user_id: userId,
            hotel_id: hotelId,
            check_in_date: checkInDate,
            check_out_date: checkOutDate,
            status: status
        };

        // Make the POST request using Axios
        const response = await axios.post(url, data);

        // Handle the response
        console.log('Response:', response.data);
        return response.data;

    } catch (error) {
        // Handle the error
        console.error('Error creating hotel booking:', error);
        throw error;
    }
}

// Example usage of the createHotelBooking function
// createHotelBooking(5, 5, '2024-08-01', '2024-08-07', 'confirmed')
//     .then(response => {
//         // Handle the successful response
//         console.log('Hotel booking created successfully:', response);
//     })
//     .catch(error => {
//         // Handle any errors
//         console.error('Error:', error);
//     });
