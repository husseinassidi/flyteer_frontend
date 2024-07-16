import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid@4.0.1/nanoid.js';
import createHotelBooking from "./create.js";
import deleteHotelBooking from "./delete.js";

export function getSelectedHotel() {
    const hotelDetails = localStorage.getItem('selectedHotel');
    console.log(hotelDetails);
    return hotelDetails ? JSON.parse(hotelDetails) : null;
}

// Function to set the selected hotel in local storage
export async function setSelectedHotel(hotelDetails) {
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
                    <form>
                    <input type = "date" id="check_in_date" ></input>
                    <input type = "date" id="check_out_date" ></input>
                    </form>

                    <button id="confirm_deal">Confirm</button>
                </div>
            `;

            const confirm_btn = document.getElementById("confirm_deal");
            confirm_btn.addEventListener('click', async () => {
                var date1 = document.getElementById('check_in_date').value;
                var date2 = document.getElementById('check_out_date').value;
                const unique_id2 = nanoid(10);
                const unique_id=unique_id2
                console.log("check id 1: ",unique_id);

                console.log('Confirm button clicked');
                const bookingDetails = {
                    user_id: 5, // Replace with actual user_id
                    hotel_id: hotel.hotel_id,
                    check_in_date: date1, // Replace with actual check-in date
                    check_out_date: date2, // Replace with actual check-out date
                    status: 'confirmed', // Replace with actual status if needed
                    unique_id:unique_id

                };

                try {
                    const response = await createHotelBooking(
                        bookingDetails.user_id, 
                        bookingDetails.hotel_id, 
                        bookingDetails.check_in_date, 
                        bookingDetails.check_out_date, 
                        bookingDetails.status,
                        bookingDetails.unique_id
                    );

                    console.log(bookingDetails);
                    console.log('Hotel booking created successfully:', response);
                    alert('Booking confirmed!');
                    
                    // Add delete button after booking is created
                    hotel_card.innerHTML += `
                        <button id="delete_stay">Revert Booking</button>
                    `;

                    const delete_btn = document.getElementById("delete_stay");
                    delete_btn.addEventListener('click', async (e) => {
                        try { e.preventDefault()
                            // Assuming `response` from `createHotelBooking` contains `unique_id`
                            const deleteResponse = await deleteHotelBooking({ "unique_id":bookingDetails.unique_id})
                            console.log({ "unique_id": bookingDetails.unique_id });

                            console.log('Hotel booking deleted successfully:', deleteResponse);
                            alert('Booking reverted!');
                            
                            // Optionally, you might want to update the UI or remove the booking details from the view
                        } catch (error) {
                            console.error('Error:', error);
                            alert('Failed to revert booking.');
                        }
                    });

                    // delete_btn.addEventListener('click',async(e)=>{
                    //     e.preventDefault()
                    //  bbookingDetails.unique_id

                    // })
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
