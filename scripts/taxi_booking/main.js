import getTaxis from '../../scripts/taxi_booking/getTaxis.js';
import getTaxi from '../../scripts/taxi_booking/getTaxi.js';

// Function to dynamically display filtered taxi cards
async function displayFilteredTaxis(pickup_location) {
    try {
        const taxis = await getTaxis();
        console.log('All taxis:', taxis); // Log all taxis

        // Filter taxis based on user input
        const filteredTaxis = taxis.filter(taxi => {
            const matchesPickupLocation = pickup_location ? taxi.location?.toLowerCase().includes(pickup_location.toLowerCase()) : true;
            return matchesPickupLocation;
        });

        console.log('Filtered taxis:', filteredTaxis); // Log filtered taxis

        // Select the container where filtered taxis will be displayed
        const filterContainer = document.querySelector('#resultsSection');
        if (!filterContainer) {
            console.error('Results section not found.');
            return;
        }

        // Clear previous content
        filterContainer.innerHTML = '';

        // Create and append HTML for each filtered taxi
        filteredTaxis.forEach(taxi => {
            const taxiCard = `
                <div class="taxi-card" id="${taxi.taxi_id}">
                    <h3>${taxi.driver_name}</h3>
                    <p>Location: ${taxi.location}</p>
                    <p>License: ${taxi.license}</p>
                    <p>Price per km: $${taxi.price_per_km}</p>
                    <p>Color: ${taxi.color}</p>
                    <p>Type: ${taxi.type}</p>
                    <button class="view_deal" id="btn_${taxi.taxi_id}">View Deal</button>
                </div>
            `;
            filterContainer.insertAdjacentHTML('beforeend', taxiCard);
        });

        // Add event listeners to "View Deal" buttons
        const viewButtons = document.querySelectorAll(".view_deal");
        viewButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                // Access the button's ID and extract taxi ID
                const taxiId = event.currentTarget.id.replace('btn_', '');
                console.log('View Deal clicked for taxi ID:', taxiId);

                // Find the selected taxi from filtered taxis
                const selectedTaxi = filteredTaxis.find(taxi => taxi.taxi_id == taxiId);
                console.log('Selected taxi details:', selectedTaxi);

                // Store the selected taxi details in localStorage
                localStorage.setItem('selectedTaxi', JSON.stringify(selectedTaxi));
                console.log('Stored selected taxi details in localStorage:', selectedTaxi);

                // Redirect to the taxi booking page
                window.location.href = "../taxi_booking/taxibooking.html";
            });
        });
    } catch (error) {
        console.error('Error displaying filtered taxis:', error);
    }
}

// Example usage: Replace with event listener for your search button or form submit
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search-button');
    if (!searchButton) {
        console.error('Search button not found.');
        return;
    }

    searchButton.addEventListener('click', (event) => {
        event.preventDefault();

        const pickupLocationInput = document.getElementById('pickup-location')?.value || '';
        const destinationInput = document.getElementById('destination')?.value || ''; // Currently unused
        const pickupDateInput = document.getElementById('pickup-date')?.value || ''; // Currently unused
        const pickupTimeInput = document.getElementById('pickup-time')?.value || ''; // Currently unused

        displayFilteredTaxis(pickupLocationInput);
        console.log("Search executed with values:", { pickupLocationInput, destinationInput, pickupDateInput, pickupTimeInput });
    });
});