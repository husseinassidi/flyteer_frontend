import auth from "./Auth.js";
document.addEventListener("DOMContentLoaded", async function () {
  auth();
  const get_taxi_company =
    "http://localhost/grpProject%232/flyteer_backend/api/taxi_company/read.php";
  const get_taxis =
    "http://localhost/grpProject%232/flyteer_backend/api/taxi/read.php";
  const post_taxis =
    "http://localhost/grpProject%232/flyteer_backend/api/taxi/create.php";
  const delete_taxis =
    "http://localhost/grpProject%232/flyteer_backend/api/taxi/delete.php";
  const update_taxis =
    "http://localhost/grpProject%232/flyteer_backend/api/taxi/update.php";
  const tableBody = document.querySelector(".main-content tbody");
  const createBtn = document.getElementById("createBtn");
  const popupModal = document.getElementById("popupModal");
  const deleteModal = document.getElementById("deleteModal");
  const closeBtns = document.querySelectorAll(".close");
  const addTaxiForm = document.getElementById("addTaxiForm");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
  const deleteMessage = document.getElementById("deleteMessage");
  const logoutBtn = document.getElementById("logoutBtn");

  let taxiToDelete = null;

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

  window.addEventListener("click", (event) => {
    if (event.target == popupModal) {
      popupModal.style.display = "none";
    }
    if (event.target == deleteModal) {
      deleteModal.style.display = "none";
    }
    if (event.target == updateModal) {
      updateModal.style.display = "none";
    }
  });

  addTaxiForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const taxiCompany = document.getElementById("taxiCompany").value;
    const taxiLocation = document.getElementById("taxiLocation").value;
    const pricePerKM = document.getElementById("pricePerKM").value;
    const license = document.getElementById("license").value;
    const driverName = document.getElementById("driverName").value;
    const color = document.getElementById("color").value;
    const type = document.getElementById("type").value;

    try {
      const response = await axios.post(
        post_taxis,
        {
          taxi_company: taxiCompany,
          location: taxiLocation,
          price_per_km: pricePerKM,
          license: license,
          driver_name: driverName,
          color: color,
          type: type,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Taxi added successfully!",
        });
        popupModal.style.display = "none";
        fetchTaxis();
        addTaxiForm.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error adding taxi. Please try again.",
        });
        console.log(response.data.debug);
      }
    } catch (error) {
      console.error("Error adding taxi:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error adding taxi. Please try again.",
      });
    }
  });

  async function fetchTaxis() {
    try {
      const response = await axios.get(get_taxis);
      const taxis = response.data;

      console.log(taxis);

      tableBody.innerHTML = "";

      if (Array.isArray(taxis)) {
        taxis.forEach((taxi) => {
          const row = `
            <tr>
              <td>${taxi.taxi_id}</td>
              <td>${taxi.taxi_company}</td>
              <td>${taxi.location}</td>
              <td>${taxi.price_per_km}</td>
              <td>${taxi.license}</td>
              <td>${taxi.driver_name}</td>
              <td>${taxi.color}</td>
              <td>${taxi.type}</td>
              <td class="no-wrap">
                <button class="action-btn update-btn">Update</button>
                <button class="action-btn delete-btn" data-id="${taxi.taxi_id}" data-name="${taxi.taxi_company}">Delete</button>
              </td>
            </tr>
          `;
          tableBody.innerHTML += row;
        });
      } else {
        throw new Error("Data format error: expected an array.");
      }

      const deleteButtons = document.querySelectorAll(".delete-btn");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
          taxiToDelete = {
            id: this.getAttribute("data-id"),
            name: this.getAttribute("data-name"),
          };
          deleteMessage.textContent = `Are you sure you want to delete "${taxiToDelete.name}"?`;
          deleteModal.style.display = "block";
        });
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
      tableBody.innerHTML =
        '<tr><td colspan="9">Error loading data. Please try again later.</td></tr>';
    }
  }

  async function fetchTaxiCompany() {
    try {
      const response = await axios.get(get_taxi_company);
      const taxiCompanies = response.data;
      console.log(taxiCompanies);
      // Populate dropdown with taxi companies
      const select = document.getElementById("taxiCompany");
      const updateSelect = document.getElementById("updateTaxiCompany");
      select.innerHTML = "";
      updateSelect.innerHTML = "";
      console.log("taxi companies", taxiCompanies);
      taxiCompanies.forEach((company) => {
        const option = document.createElement("option");
        option.value = company.taxi_company_name;
        option.textContent = company.taxi_company_name;
        select.appendChild(option);

        // Add the same options to the update select
        const updateOption = document.createElement("option");
        updateOption.value = company.taxi_company_id;
        updateOption.textContent = company.taxi_company_name;
        updateSelect.appendChild(updateOption);
      });

      $("#taxiCompany").select2();
      $("#updateTaxiCompany").select2();
    } catch (error) {
      console.error("Error fetching taxi companies:", error);
    }
  }

  await fetchTaxis();
  await fetchTaxiCompany();

  confirmDeleteBtn.addEventListener("click", async () => {
    if (taxiToDelete) {
      try {
        const response = await axios.post(
          delete_taxis,
          {
            taxi_id: taxiToDelete.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: `Taxi "${taxiToDelete.name}" deleted successfully!`,
          });
          deleteModal.style.display = "none";
          fetchTaxis();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error deleting taxi. Please try again.",
          });
          console.log(response.data.debug);
        }
      } catch (error) {
        console.error("Error deleting taxi:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error deleting taxi. Please try again.",
        });
      }
    }
  });

  cancelDeleteBtn.addEventListener("click", () => {
    deleteModal.style.display = "none";
  });

  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("update-btn")) {
      const row = event.target.closest("tr");
      document.getElementById("updateTaxiId").value = row.cells[0].textContent;
      document.getElementById("updateTaxiCompany").value =
        row.cells[1].textContent;
      document.getElementById("updateTaxiLocation").value =
        row.cells[2].textContent;
      document.getElementById("updatePricePerKM").value =
        row.cells[3].textContent;
      document.getElementById("updateLicense").value = row.cells[4].textContent;
      document.getElementById("updateDriverName").value =
        row.cells[5].textContent;
      document.getElementById("updateColor").value = row.cells[6].textContent;
      document.getElementById("updateType").value = row.cells[7].textContent;
      document.getElementById("updateModal").style.display = "block";
    }
  });

  document
    .getElementById("updateTaxiForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const taxiId = document.getElementById("updateTaxiId").value;
      const taxiCompany = document.getElementById("updateTaxiCompany").value;
      const taxiLocation = document.getElementById("updateTaxiLocation").value;
      const pricePerKM = document.getElementById("updatePricePerKM").value;
      const license = document.getElementById("updateLicense").value;
      const driverName = document.getElementById("updateDriverName").value;
      const color = document.getElementById("updateColor").value;
      const type = document.getElementById("updateType").value;
      console.log(
        taxiId,
        taxiCompany,
        taxiLocation,
        pricePerKM,
        license,
        driverName,
        color,
        type
      );
      try {
        const response = await axios.post(
          update_taxis,
          {
            taxi_id: taxiId,
            taxi_company: taxiCompany,
            location: taxiLocation,
            price_per_km: pricePerKM,
            license: license,
            driver_name: driverName,
            color: color,
            type: type,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success === "Taxi updated") {
          Swal.fire({
            icon: "success",
            title: "Updated",
            text: "Taxi updated successfully!",
          });
          document.getElementById("updateModal").style.display = "none";
          fetchTaxis();
        } else {
          Swal.fire({
            icon: "error",
            title: "Update Failed",
            text:
              response.data.error || "Error updating taxi. Please try again.",
          });
        }
      } catch (error) {
        console.error("Update error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error updating taxi. Please try again.",
        });
      }
    });
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "../login.html";
  });
});
