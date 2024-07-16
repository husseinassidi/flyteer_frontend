// deleteBooking.js

function deleteBooking() {
    var flight_id = localStorage.getItem('selectedFlightId');
    var user_id = 1; // Replace with actual user ID from your authentication system

    var data = {
        user_id: user_id,
        flight_id: flight_id
    };

    fetch('http://localhost/FlyteerBackend/flyteer_backend/api/booking/flight/delete.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.message === "Flight booking was deleted.") {
            alert("Flight Booking Deleted");
        } else {
            alert("Deletion failed: " + result.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
