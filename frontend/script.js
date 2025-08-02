const apiUrl = "http://localhost:3000/cities";

document.getElementById("addForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = document.getElementById("cityInput").value;
  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: city }),
  });
  document.getElementById("cityInput").value = "";
  loadCities();
});

async function loadCities() {
  const res = await fetch(apiUrl);
  const cities = await res.json();

  const container = document.getElementById("citiesContainer");
  container.innerHTML = "";
  for (let city of cities) {
    const div = document.createElement("div");
    div.className = "city-card";
    div.innerHTML = `
      <strong>${city.name}</strong><br>
      Temp: ${city.weather?.temp ?? "Loading..."}°C<br>
      <button onclick="deleteCity('${city.id}')">Delete</button>
    `;
    container.appendChild(div);
  }
}

async function deleteCity(id) {
  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  loadCities();
}

loadCities();