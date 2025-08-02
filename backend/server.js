const express = require("express");
const fs = require("fs");
const cors = require("cors");
const axios = require("axios");
const { v4: uuid } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "5d78dfac28f7a654561e267205c54e19";

let cities = require("./data.json");

app.get("/cities", async (req, res) => {
  const updated = await Promise.all(
    cities.map(async (city) => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${API_KEY}&units=metric`);

        return { ...city, weather: { temp: response.data.main.temp } };
      } catch {
        return city;
      }
    })
  );
  res.json(updated);
});

app.post("/cities", (req, res) => {
  const newCity = { id: uuid(), name: req.body.name };
  cities.push(newCity);
  fs.writeFileSync("./backend/data.json", JSON.stringify(cities));
  res.status(201).json(newCity);
});

app.delete("/cities/:id", (req, res) => {
  cities = cities.filter((c) => c.id !== req.params.id);
  fs.writeFileSync("./backend/data.json", JSON.stringify(cities));
  res.status(204).send();
});

app.listen(3000, () => console.log("Server running on port 3000"));