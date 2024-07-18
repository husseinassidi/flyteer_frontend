// const axios = require('axios');
// import axios from 'axios';
// // Replace with the URL of your PHP backend
// const API_URL = 'http://localhost/FlyteerBackend/flyteer_backend/api/flight/read.php';

// axios.get(API_URL)
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(error => {
//         console.error('Error fetching flight data:', error);
//     });
import axios from 'https://cdn.skypack.dev/axios'; 
const API_URL = 'http://localhost/FlyteerBackend/flyteer_backend/api/flight/read.php';

const fetchFlights = () => {
    return axios.get(API_URL)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching flight data:', error);
            return [];
        });
};

export { fetchFlights };
