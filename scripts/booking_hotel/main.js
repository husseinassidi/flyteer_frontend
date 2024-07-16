import getHotels from "../hotel/getHotels.js";

// Function to search and filter hotels
async function onsearch(hotel_location, hotel_name, Budget) {
    try {
        const hotels = await getHotels();

        // Filter hotels based on the provided attributes
        const filteredHotels = hotels.filter(hotel => {
            const matchesLocation = hotel_location ? hotel.hotel_location.toLowerCase().includes(hotel_location.toLowerCase()) : true;
            const matchesName = hotel_name ? hotel.hotel_name.toLowerCase().includes(hotel_name.toLowerCase()) : true;
            const matchesBudget = Budget ? hotel.price_per_night <= Budget : true;

            return matchesLocation && matchesName && matchesBudget;
        });

        console.log('Filtered Hotels:', filteredHotels);
        return filteredHotels;

    } catch (error) {
        console.error('Error in onsearch:', error);
        throw error;
    }
}

// Get elements
const search_btn = document.getElementById("search_hotel");
const hotel_location = document.getElementById("location");
const hotel_name = document.getElementById("hotel_name");
const Budget = document.getElementById("budget");

// Add event listener to the search button
search_btn.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get input values
    const locationValue = hotel_location.value;
    const nameValue = hotel_name.value;
    const budgetValue = parseFloat(Budget.value); // Convert to number

    try {
        // Call the search function
        const filteredHotels = await onsearch(locationValue, nameValue, budgetValue);

        // Handle the filtered hotels (e.g., display them)
        console.log('Hotels matching the search criteria:', filteredHotels);
    } catch (error) {
        console.error('Error:', error);
    }
});
