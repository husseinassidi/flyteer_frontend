document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.filter-button').addEventListener('click', filterFlights);
});

function filterFlights() {
    const fromWhere = document.querySelector('input[placeholder="From Where?"]').value;
    const toWhere = document.querySelector('input[placeholder="To Where?"]').value;
    const date = document.querySelector('input[type="date"]').value;
    const price = document.querySelector('#price').value;

    fetch('http://localhost/FlyteerBackend/flyteer_backend/api/flights/read.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
            } else {
                const filteredFlights = data.filter(flight => {
                    return (
                        (fromWhere === '' || flight.departure_airport.toLowerCase().includes(fromWhere.toLowerCase())) &&
                        (toWhere === '' || flight.arrival_airport.toLowerCase().includes(toWhere.toLowerCase())) &&
                        (date === '' || flight.departure_time.includes(date)) &&
                        (price === '' || flight.price <= parseFloat(price))
                    );
                });

                displayFlights(filteredFlights);
            }
        })
        .catch(error => console.error('Error:', error));
}

function displayFlights(flights) {
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'results-container';

    flights.forEach(flight => {
        const flightDiv = document.createElement('div');
        flightDiv.className = 'flight';

        const flightInfo = `
            <div>
                <strong>From:</strong> ${flight.departure_airport} at ${flight.departure_time}<br>
                <strong>To:</strong> ${flight.arrival_airport} at ${flight.arrival_time}
            </div>
            <div>
                <strong>Price:</strong> $${flight.price}<br>
                <button onclick="bookFlight(${flight.flight_id})">Book</button>
            </div>
        `;

        flightDiv.innerHTML = flightInfo;
        resultsContainer.appendChild(flightDiv);
    });

    // Clear previous results
    const main = document.querySelector('main');
    main.innerHTML = '';
    main.appendChild(resultsContainer);
}
