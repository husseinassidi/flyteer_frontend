export default async function getTaxis() {
    try {
        const response = await axios.get('http://localhost/flyteer_backend/api/taxi/getTaxis.php');
        console.log('Taxis fetched:', response.data); // Add this line
        return response.data;
    } catch (error) {
        console.error('Error fetching taxis:', error);
        throw error;
    }
}
