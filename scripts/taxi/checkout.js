async function handleSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Capture form data
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Retrieve selected taxi details from localStorage
    const selectedTaxi = JSON.parse(localStorage.getItem('selectedTaxi'));

    if (!selectedTaxi) {
        alert('No taxi selected.');
        return;
    }

    const bookingData = {
        user_id: 1, // Replace with actual user ID
        taxi_id: selectedTaxi.taxi_id,
        pickup_location: selectedTaxi.location, // Or capture from form if different
        dropoff_location: 'Example Destination', // Replace with actual data
        pickup_time: new Date().toISOString(), // Replace with actual data
        status: 'confirmed'
    };

    try {
        const response = await axios.post('http://localhost/flyteer_backend/api/booking/taxi/create.php', bookingData);

        if (response.data.message === 'Taxi booking was created.') {
            alert('Your taxi is booked!');
        } else {
            alert('Failed to book taxi.');
        }
    } catch (error) {
        console.error('Error booking taxi:', error);
        alert('An error occurred while booking the taxi.');
    }
}

function handleSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting
    alert('Your taxi is booked!');
}