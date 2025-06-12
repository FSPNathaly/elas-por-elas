document.addEventListener("DOMContentLoaded", () => {
  const map = L.map("map").setView([-8.05428, -34.8813], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const postos = [
    {
      nome: "Delegacia da Mulher",
      endereco: "Praça do Campo Santo, S/N",
      lat: -8.0522,
      lon: -34.8855,
    },
    {
      nome: "Departamento de Polícia da Mulher",
      endereco: "Av. Alfredo Lisboa, 188",
      lat: -8.0629,
      lon: -34.871,
    },
    {
      nome: "2ª Delegacia de Polícia",
      endereco: "Av. Eng. Domingos Ferreira, Boa Viagem",
      lat: -8.1188,
      lon: -34.903,
    },
    {
      nome: "Delegacia de Polícia de Olinda",
      endereco: "Av. Gov. Agamenon Magalhães, Olinda",
      lat: -8.0163,
      lon: -34.855,
    },
  ];

  postos.forEach((posto) => {
    L.marker([posto.lat, posto.lon])
      .addTo(map)
      .bindPopup(`<b>${posto.nome}</b><br>${posto.endereco}`);
  });

  const btnLocate = document.getElementById("localizacao");

  btnLocate.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          const userMarker = L.marker([lat, lon], {
            icon: L.icon({
              iconUrl: "../../assets/location-user.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            }),
          })
            .addTo(map)
            .bindPopup("Você está aqui")
            .openPopup();

          map.setView([lat, lon], 16);
        },
        (err) => {
          alert(
            "Não foi possível obter sua localização. Verifique as permissões."
          );
          console.error(err);
        }
      );
    } else {
      alert("Seu navegador não suporta geolocalização.");
    }
  });
});
