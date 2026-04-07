const express = require("express");
const axios = require("axios");

const app = express();

const PORT = 3000;

app.get("/weather", async (req, res) => {
    const city = req.query.city;

    try{
        const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?
            q=${city}&appid=abcd12348&units=metric`
        );

        const data = response.data;

        res.json({
            city: data.name,
            temperature: data.main.temp,
            weather: data.weather[0].description
        });

    }catch (error) {
        console.log(error.response?.data|| error.message);
        res.json({ message: "Error fetching weather"});
    }
    
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});