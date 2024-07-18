import { fetchFlights } from './read.js';

const displayFlights = (flights) => {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear any existing results

    if (flights.length === 0) {
        resultsContainer.innerHTML = '<p>No flights found.</p>';
        return;
    }

    flights.forEach(flight => {
        const flightElement = document.createElement('div');
        flightElement.classList.add('flight');
        flightElement.innerHTML = `
            <h3>${flight.airline}</h3>
            <p>From: ${flight.from || 'N/A'}</p>
            <p>To: ${flight.to || 'N/A'}</p>
            <p>Date: ${flight.date || 'N/A'}</p>
            <p>Price: $${flight.price}</p>
        `;
        resultsContainer.appendChild(flightElement);
    });
};

const filterFlights = () => {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;
    const price = document.getElementById('price').value;

    fetchFlights(from, to, date, price).then(displayFlights);
};

document.getElementById('filter-button').addEventListener('click', filterFlights);
