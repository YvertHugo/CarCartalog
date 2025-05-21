const URL_API = "http://127.0.0.1:8000/api/";
const token = localStorage.getItem('token');

document.addEventListener("DOMContentLoaded", () => {
  chargerListeMarques();

  const addCarForm = document.getElementById('addCar-form');
  addCarForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const modele = document.getElementById('modele').value.trim();
    const annee = document.getElementById('annee').value;
    const marqueId = document.getElementById('marque-select').value;

    if (!modele || !annee || !marqueId) {
      alert("Tous les champs sont requis.");
      return;
    }

    try {
      const res = await fetch(URL_API + "voiture/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: buildFormData({
          modele: modele,
          annee: annee,
          marque_id: marqueId
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Voiture ajoutée avec succès !");
        window.location.href = "index.html";
      } else {
        alert(data.message || "Erreur lors de l'ajout de la voiture.");
      }

    } catch (err) {
      console.error(err);
      alert("Erreur réseau.");
    }
  });
});

function chargerListeMarques() {
  fetch(URL_API + "marque/get-all", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => {
    const select = document.getElementById("marque-select");

    if (!data.success || !Array.isArray(data.data)) {
      throw new Error("Format de réponse inattendu");
    }

    data.data.forEach(marque => {
      const option = document.createElement("option");
      option.value = marque.id;
      option.textContent = marque.nom;
      select.appendChild(option);
    });
  })
  .catch(err => {
    console.error("Erreur lors du chargement des marques :", err);
    alert("Impossible de charger la liste des marques.");
  });
}


function buildFormData(dataObj) {
  const formData = new FormData();
  for (let key in dataObj) {
    formData.append(key, dataObj[key]);
  }
  return formData;
}