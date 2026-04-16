const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/iss-location', async (req, res) => {
    try {
        const response = await axios.get('https://api.wheretheiss.at/v1/satellites/25544');
        res.json({ lat: response.data.latitude, lon: response.data.longitude });
    } catch (error) {
        res.status(500).send("Error fetching ISS data");
    }
});

app.listen(3001, () => console.log("Oracle Backend running on port 3001"));