// Import axios correctly
import axios from 'axios'
// Function to create a flight
async function createFlight(airline, flightNumber, departureAirport, arrivalAirport, departureTime, arrivalTime, price) {
    try {
        // Define the URL of your API endpoint
        const url = 'http://localhost/FLYTEER_BACKEND/flyteer_backend/api/flight/create.php';

        // Create the data object
        const data = {
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
        console.error('Error creating flight:', error);
        throw error;
    }
}

// Example usage of the createFlight function
createFlight('Airline A', 'AA101', 1, 2, '2024-07-20 10:00:00', '2024-07-20 12:00:00', 300)
    .then(response => {
        // Handle the successful response
        console.log('Flight created successfully:', response);
    })
    .catch(error => {
        // Handle any errors
        console.error('Error:', error);
    });
