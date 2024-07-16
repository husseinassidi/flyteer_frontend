import createHotelBooking from "./create.js";

export function getSelectedHotel() {
    const hotelDetails = localStorage.getItem('selectedHotel');
    console.log(hotelDetails);
    return hotelDetails ? JSON.parse(hotelDetails) : null;
}

// Function to set the selected hotel in local storage
export function setSelectedHotel(hotelDetails) {
    localStorage.setItem('selectedHotel', JSON.stringify(hotelDetails));
}

document.addEventListener('DOMContentLoaded', () => {
    const hotelDetails = getSelectedHotel();

    if (hotelDetails && hotelDetails[0]) {
        const hotel = hotelDetails[0]; // Assuming the first element is the selected hotel

        const hotel_card = document.getElementById("hotel_stay_card");

        if (hotel_card) {
            hotel_card.innerHTML = `
                <div class="deal_details" id="${hotel.hotel_id}">
                    <h1 id="hotel_name">${hotel.hotel_name}</h1>
                    <h1 id="hotel_location">${hotel.hotel_location}</h1>
                    <h1 id="price_per_night">${hotel.price_per_night}</h1>
                    <button id="confirm_deal">Confirm</button>
                </div>
            `;

            const confirm_btn = document.getElementById("confirm_deal");
            confirm_btn.addEventListener('click', async () => {
                console.log('Confirm button clicked');
                const bookingDetails = {
                    user_id: 5, // Replace with actual user_id
                    hotel_id: hotel.hotel_id,
                    check_in_date: '2024-08-01', // Replace with actual check-in date
                    check_out_date: '2024-08-05', // Replace with actual check-out date
                    status: 'confirmed' // Replace with actual status if needed
                };

                try {
                    const response = await createHotelBooking(
                        bookingDetails.user_id, 
                        bookingDetails.hotel_id, 
                        bookingDetails.check_in_date, 
                        bookingDetails.check_out_date, 
                        bookingDetails.status
                    );
                    console.log('Hotel booking created successfully:', response);
                    alert('Booking confirmed!');
                } catch (error) {
                    console.error('Error:', error);
                    alert('Failed to create booking.');
                }
            });
        } else {
            console.error('Element with ID "hotel_stay_card" not found.');
        }
    } else {
        console.error('No hotel selected.');
    }
});
