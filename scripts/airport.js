import auth from "./Auth.js";
document.addEventListener("DOMContentLoaded", () => {
  auth();
  const apiUrl =
    "http://localhost/grpProject%232/flyteer_backend/api/airport/getAirports.php";
  const createAirportUrl =
    "http://localhost/grpProject%232/flyteer_backend/api/airport/create.php";
  const updateAirportUrl =
    "http://localhost/grpProject%232/flyteer_backend/api/airport/update.php";
  const deleteAirportUrl =
    "http://localhost/grpProject%232/flyteer_backend/api/airport/delete.php";

  const createBtn = document.getElementById("createBtn");
  const popupModal = document.getElementById("popupModal");
  const deleteModal = document.getElementById("deleteModal");
  const updateModal = document.getElementById("updateModal");
  const closeBtns = document.querySelectorAll(".close");
  const addAirportForm = document.getElementById("addAirportForm");
  const updateAirportForm = document.getElementById("updateAirportForm");
  const airportTableBody = document.querySelector("tbody");

  createBtn.addEventListener("click", () => {
    popupModal.style.display = "block";
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      popupModal.style.display = "none";
      deleteModal.style.display = "none";
      updateModal.style.display = "none";
    });
  });

  const loadAirports = async () => {
    try {
      const response = await axios.get(apiUrl);
      const airports = response.data;
      airportTableBody.innerHTML = "";
      airports.forEach((airport) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${airport.airport_id}</td>
          <td>${airport.name}</td>
          <td>${airport.location}</td>
          <td>
            <button class="action-btn update-btn" data-id="${airport.airport_id}">Edit</button>
            <button class="action-btn delete-btn" data-id="${airport.airport_id}">Delete</button>
          </td>
        `;
        airportTableBody.appendChild(row);
      });

      document.querySelectorAll(".update-btn").forEach((button) => {
        button.addEventListener("click", handleEdit);
      });

      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", handleDelete);
      });
    } catch (error) {
      console.error("Error loading airports:", error);
    }
  };

  addAirportForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const airportData = {
      name: addAirportForm.airportName.value,
      location: addAirportForm.airportLocation.value,
    };
    try {
      await axios.post(createAirportUrl, airportData);
      loadAirports();
      popupModal.style.display = "none";
      addAirportForm.reset();
    } catch (error) {
      console.error("Error adding airport:", error);
    }
  });

  const handleEdit = (event) => {
    const airportId = event.target.dataset.id;
    const row = event.target.closest("tr");
    const name = row.children[1].textContent;
    const location = row.children[2].textContent;

    updateAirportForm.querySelector("#updateAirportId").value = airportId;
    updateAirportForm.querySelector("#updateAirportName").value = name;
    updateAirportForm.querySelector("#updateAirportLocation").value = location;

    updateModal.style.display = "block";
  };

  updateAirportForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const airportData = {
      airport_id: updateAirportForm.updateAirportId.value,
      name: updateAirportForm.updateAirportName.value,
      location: updateAirportForm.updateAirportLocation.value,
    };
    try {
      await axios.post(updateAirportUrl, airportData);
      loadAirports();
      updateModal.style.display = "none";
      updateAirportForm.reset();
    } catch (error) {
      console.error("Error updating airport:", error);
    }
  });

  const handleDelete = (event) => {
    const airportId = event.target.dataset.id;
    const row = event.target.closest("tr");
    const name = row.children[1].textContent;

    document.getElementById("confirmDeleteBtn").dataset.id = airportId;
    document.getElementById(
      "deleteMessage"
    ).textContent = `Are you sure you want to delete the airport "${name}"?`;
    deleteModal.style.display = "block";
  };

  document
    .getElementById("confirmDeleteBtn")
    .addEventListener("click", async (event) => {
      const airportId = event.target.dataset.id;
      try {
        const response = await axios.post(deleteAirportUrl, {
          airport_id: airportId,
        });
        if (response.data.success) {
          Swal.fire("Deleted!", "The airport has been deleted.", "success");
        } else {
          Swal.fire(
            "Error!",
            "There was a problem deleting the airport.",
            "error"
          );
        }
        loadAirports();
        deleteModal.style.display = "none";
      } catch (error) {
        console.error("Error deleting airport:", error);
        Swal.fire(
          "Error!",
          "There was a problem deleting the airport.",
          "error"
        );
      }
    });

  document.getElementById("cancelDeleteBtn").addEventListener("click", () => {
    deleteModal.style.display = "none";
  });

  loadAirports();
});
