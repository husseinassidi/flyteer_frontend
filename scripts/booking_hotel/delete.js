// import axios from 'axios';

// Function to delete a hotel booking
export default async function deleteHotelBooking(bookingDetails) {
    try {
        const url = 'http://localhost/FLYTEER_BACKEND/flyteer_backend/api/booking/hotel/delete.php';

        // Make the DELETE request using Axios
        const response = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: bookingDetails
        });
        console.log("deleted");

        // Handle the response
        console.log('Response:', response.data);
        return response.data;

    } catch (error) {
        // Handle the error
        console.error('Error deleting hotel booking:', error);
        throw error;
    }
}
