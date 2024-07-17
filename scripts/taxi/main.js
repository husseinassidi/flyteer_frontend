document.addEventListener('DOMContentLoaded', () => {
    const taxiDetails = JSON.parse(localStorage.getItem('selectedTaxi'));

    console.log('Retrieved taxi details:', taxiDetails);  // Log retrieved details

    if (taxiDetails) {
        const dealInfo = document.querySelector('.deal-info');
        if (dealInfo) {
            dealInfo.innerHTML = `
                <h3>${taxiDetails.type} <span class="car-color">${taxiDetails.color}</span></h3>
                <p><img src="/Images/driver.jpg" alt="User Icon"> ${taxiDetails.driver_name}</p>
                <p><img src="/Images/location.png" alt="Location Icon"> From: ${taxiDetails.location}</p>
                <p><img src="/Images/company.png" alt="Company Icon"> Company: ${taxiDetails.taxi_company}</p>
                <p><img src="/Images/price.png" alt="Price Icon"> Price per km: $${taxiDetails.price_per_km}</p>
                <button class="checkout-button" onclick="goToCheckout()">Go to checkout</button>
            `;
        } else {
            console.error('deal-info element not found.');
        }
    } else {
        console.error('No taxi details found in localStorage.');
        const dealInfo = document.querySelector('.deal-info');
        if (dealInfo) {
            dealInfo.innerHTML = '<p>No taxi details available.</p>';
        }
    }
});

function goToCheckout() {
    window.location.href = '../taxi_booking/checkout.html';
}
