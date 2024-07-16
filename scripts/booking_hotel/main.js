import getHotels from "../hotel/getHotels.js";
import getHotel from "../hotel/getHotel.js";


// Function to dynamically display filtered hotel cards
async function displayFilteredHotels(hotel_location, hotel_name, budget) {
    try {
        const hotels = await getHotels();

        // Filter hotels based on user input
        const filteredHotels = hotels.filter(hotel => {
            const matchesLocation = hotel_location ? hotel.hotel_location.toLowerCase().includes(hotel_location.toLowerCase()) : true;
            const matchesName = hotel_name ? hotel.hotel_name.toLowerCase().includes(hotel_name.toLowerCase()) : true;
            const matchesBudget = budget ? hotel.price_per_night <= parseFloat(budget) : true;

            return matchesLocation && matchesName && matchesBudget;
        });

        // Select the container where filtered hotels will be displayed
        const filterContainer = document.querySelector('.filter_container');
        if (!filterContainer) {
            console.error('Filter container not found.');
            return;
        }

        // Clear previous content
        filterContainer.innerHTML = '';

        // Create and append HTML for each filtered hotel
        filteredHotels.forEach(hotel => {
            const hotelCard = `
                <div class="hotel-card" id="${hotel.hotel_id}">
                    <h3>${hotel.hotel_name}</h3>
                    <p>Location: ${hotel.hotel_location}</p>
                    <p>Price per night: ${hotel.price_per_night}</p>
                    <button class="view_deal" id="btn_${hotel.hotel_id}">View Deal</button>
                </div>
            `;
            filterContainer.insertAdjacentHTML('beforeend', hotelCard);
        });

        // Add event listeners to "View Deal" buttons
        const viewButtons = document.querySelectorAll(".view_deal");
        viewButtons.forEach(button => {
            button.addEventListener('click', async (event) => {
                event.preventDefault();
                // Access the button's ID and extract hotel ID
                const hotelId = event.currentTarget.id.replace('btn_', '');
                console.log('View Deal clicked for hotel ID:', hotelId);

                try {
                    // Fetch the detailed hotel information
                    const hotelDetails = await getHotel(hotelId);
                    console.log('Hotel details:', hotelDetails);

                    // Assuming you want to store details or some reference before redirection
                    localStorage.setItem('selectedHotel', JSON.stringify(hotelDetails));

                    // Redirect to the booking page
                    window.location.href = "../../pages/hotel_booking/booking_deal.html";


        return(hotelDetails)

                } catch (error) {
                    console.error('Error fetching hotel details:', error);
                }
            });
        });
    } catch (error) {
        console.error('Error displaying filtered hotels:', error);
    }
}

// Example usage: Replace with event listener for your search button or form submit
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search_hotel');
    if (!searchButton) {
        console.error('Search button not found.');
        return;
    }

    searchButton.addEventListener('click', (event) => {
        event.preventDefault();

        const locationInput = document.getElementById('location')?.value || '';
        const hotelNameInput = document.getElementById('hotel_name')?.value || '';
        const budgetInput = document.getElementById('budget')?.value || '';

        displayFilteredHotels(locationInput, hotelNameInput, budgetInput);
        console.log("Search executed with values:", { locationInput, hotelNameInput, budgetInput });
    });
});
