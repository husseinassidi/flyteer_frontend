const axios = require('axios');
// import axios from 'https://cdn.skypack.dev/axios'; 
// Replace with the URL of your PHP backend
const API_URL = 'http://localhost/FlyteerBackend/flyteer_backend/api/flight/read.php';

axios.get(API_URL)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error fetching flight data:', error);
    });
