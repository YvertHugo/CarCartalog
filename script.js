document.addEventListener('DOMContentLoaded', () => {
  const userRank = localStorage.getItem('rank');
  
  if (userRank === 'client') {
    document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
  }
});





URL_API = "http://127.0.0.1:8000/api/";

const token = localStorage.getItem('token');


// GET-ALL MARQUE
fetch(URL_API + "marque/get-all", {
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
  .then(response => response.json())
  .then(response => {
    const listeMarque = document.getElementById("liste-marque");
    listeMarque.innerHTML = "";

    const marques = response.data;
    const userRank = localStorage.getItem("rank");

    marques.forEach(marque => {
      const li = document.createElement("li");

      let buttonsHTML = "";
      if (userRank === "admin") {
        buttonsHTML = `
          <button onclick="editBrand(${marque.id}, '${marque.nom}')">Modifier</button>
          <button onclick="deleteBrand(${marque.id})">Supprimer</button>
        `;
      }

      li.innerHTML = `
        <span>${marque.nom}</span>
        ${buttonsHTML}
      `;
      listeMarque.appendChild(li);
    });
  })
  .catch(error => {
    console.error("Erreur lors du chargement des marques :", error);
  });



// POST MARQUE
const addBrandForm = document.getElementById('addBrand-form');

if (addBrandForm) {
  addBrandForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;

    try {
      const res = await fetch(URL_API + 'marque/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nom : name })
      });

      const response = await res.json();

      if (response.success) {
        alert(response.message || 'Marque ajoutée avec succès');
        window.location.href = 'index.html';
      } else {
        alert(response.message || 'Erreur lors de l\'ajout de la marque');
      }

    } catch (err) {
      alert('Une erreur est survenue');
      console.error(err);
    }
  });
}


// DELETE MARQUE
  function deleteBrand(id) {
    if (!confirm("Supprimer cette marque ?")) return;
    fetch(URL_API + `marque/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      if (response.ok) {
        alert("Marque supprimée !");
        location.reload();
      } else {
        alert("Erreur lors de la suppression.");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Erreur réseau.");
    });
  }


// UPDATE MARQUE
  function editBrand(id, oldName) {
    const newName = prompt("Nouveau nom de la marque :", oldName);
    if (!newName || newName.trim() === "") return;
  
    fetch(URL_API + `marque/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ nom: newName })
    })
    .then(response => response.json())
    .then(data => {
      alert("Marque modifiée !");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("Erreur lors de la modification.");
    });
  }
  
  


// GET-ALL VOITURE
fetch(URL_API + "voiture/get-all", {
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
  .then(response => response.json())
  .then(response => {
    const listeVoiture = document.getElementById("liste-voiture");
    listeVoiture.innerHTML = "";

    const voitures = response.data;
    const userRank = localStorage.getItem("rank"); 

    voitures.forEach(voiture => {
      const li = document.createElement("li");

      let buttonsHTML = "";
      if (userRank === "admin") {
        buttonsHTML = `
          <button onclick="editVoiture(${voiture.id}, '${voiture.nom}')">Modifier</button>
          <button onclick="deleteVoiture(${voiture.id})">Supprimer</button>
        `;
      }

      li.innerHTML = `
        <span>${voiture.marque.nom} ${voiture.modele} - ${voiture.annee}</span>
        ${buttonsHTML}
      `;
      listeVoiture.appendChild(li);
    });
  })
  .catch(error => {
    console.error("Erreur lors du chargement des voitures :", error);
  });


 // DELETE VOITURE
 function deleteVoiture(id) {
  console.log("ID Voiture :", id);
  if (!confirm("Supprimer cette voiture ?")) return;
  fetch(URL_API + `voiture/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => {
    if (response.ok) {
      alert("voiture supprimée !");
      location.reload();
    } else {
      alert("Erreur lors de la suppression.");
    }
  })
  .catch(err => {
    console.error(err);
    alert("Erreur réseau.");
  });
}


// UPDATE VOITURE
  function editVoiture(id, oldModele) {
    const newModele = prompt("Nouveau nom du Modèle :", oldModele);
    if (!newModele || newModele.trim() === "") return;
  
    fetch(URL_API + `voiture/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ nom: newModele })
    })
    .then(response => response.json())
    .then(data => {
      alert("Marque modifiée !");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("Erreur lors de la modification.");
    });
  }