// Import axios correctly
import axios from 'axios'
// Function to update a flight
async function updateFlight(flightId, airline, flightNumber, departureAirport, arrivalAirport, departureTime, arrivalTime, price) {
    try {
        // Define the URL of your API endpoint
        const url = 'http://localhost/FLYTEER_BACKEND/flyteer_backend/api/flight/update.php';

        // Create the data object
        const data = {
            flight_id: flightId,
            airline: airline,
            flight_number: flightNumber,
            departure_airport: departureAirport,
            arrival_airport: arrivalAirport,
            departure_time: departureTime,
            arrival_time: arrivalTime,
            price: price
        };

        // Make the POST request using Axios
        const response = await axios.post(url, data);

        // Handle the response
        console.log('Response:', response.data);
        return response.data;

    } catch (error) {
        // Handle the error
        console.error('Error updating flight:', error);
        throw error;
    }
}

// Example usage of the updateFlight function
updateFlight(4, 'Updated Airline', 'UA404', 1, 2, '2024-08-01 10:00:00', '2024-08-01 14:00:00', 350)
    .then(response => {
        // Handle the successful response
        console.log('Flight updated successfully:', response);
    })
    .catch(error => {
        // Handle any errors
        console.error('Error:', error);
    });
