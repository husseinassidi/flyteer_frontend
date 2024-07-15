document.addEventListener("DOMContentLoaded", async function () {
  const get_companies =
    "http://localhost/grpProject%232/flyteer_backend/api/taxi_company/read.php";
  const post_companies =
    "http://localhost/grpProject%232/flyteer_backend/api/taxi_company/create.php";
  const delete_companies =
    "http://localhost/grpProject%232/flyteer_backend/api/taxi_company/delete.php";
  const update_companies =
    "http://localhost/grpProject%232/flyteer_backend/api/taxi_company/update.php";
  const tableBody = document.querySelector(".main-content tbody");
  const createBtn = document.getElementById("createBtn");
  const popupModal = document.getElementById("popupModal");
  const deleteModal = document.getElementById("deleteModal");
  const closeBtn = document.querySelector(".close");
  const addCompanyForm = document.getElementById("addCompanyForm");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
  const deleteMessage = document.getElementById("deleteMessage");

  let companyToDelete = null;

  createBtn.addEventListener("click", () => {
    popupModal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    popupModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target == popupModal) {
      popupModal.style.display = "none";
    }
  });

  addCompanyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const companyName = document.getElementById("companyName").value;
    const companyNumber = document.getElementById("companyNumber").value;
    const companyEmail = document.getElementById("companyEmail").value;
    const companyAddress = document.getElementById("companyAddress").value;

    try {
      const response = await axios.post(
        post_companies,
        {
          taxi_company_name: companyName,
          taxi_company_number: companyNumber,
          taxi_company_email: companyEmail,
          taxi_company_address: companyAddress,
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
          text: "Company added successfully!",
        });
        popupModal.style.display = "none";
        fetchTaxiCompanies();
        addCompanyForm.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error adding company. Please try again.",
        });
        console.log(response.data.debug);
      }
    } catch (error) {
      console.error("Error adding company:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error adding company. Please try again.",
      });
    }
  });

  async function fetchTaxiCompanies() {
    try {
      const response = await axios.get(get_companies);
      const companies = response.data;

      console.log(companies);

      tableBody.innerHTML = "";

      if (!Array.isArray(companies)) {
        throw new Error("Data format error: expected an array.");
      }

      companies.forEach((company) => {
        const row = `
          <tr>
            <td>${company.taxi_company_id}</td>
            <td>${company.taxi_company_name}</td>
            <td>${company.taxi_company_address}</td>
            <td>${company.taxi_company_number || "N/A"}</td>
            <td>${company.taxi_company_email}</td>
            <td class="no-wrap">
              <button class="action-btn update-btn">Update</button>
              <button class="action-btn delete-btn" data-id="${
                company.taxi_company_id
              }" data-name="${company.taxi_company_name}">Delete</button>
            </td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });

      const deleteButtons = document.querySelectorAll(".delete-btn");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
          companyToDelete = {
            id: this.getAttribute("data-id"),
            name: this.getAttribute("data-name"),
          };
          deleteMessage.textContent = `Are you sure you want to delete "${companyToDelete.name}"?`;
          deleteModal.style.display = "block";
        });
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
      tableBody.innerHTML =
        '<tr><td colspan="6">Error loading data. Please try again later.</td></tr>';
    }
  }

  await fetchTaxiCompanies();

  confirmDeleteBtn.addEventListener("click", async () => {
    if (companyToDelete) {
      try {
        const response = await axios.post(
          delete_companies,
          {
            taxi_company_id: companyToDelete.id,
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
            text: `Company "${companyToDelete.name}" deleted successfully!`,
          });
          deleteModal.style.display = "none";
          fetchTaxiCompanies();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error deleting company. Please try again.",
          });
          console.log(response.data.debug);
        }
      } catch (error) {
        console.error("Error deleting company:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error deleting company. Please try again.",
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
      document.getElementById("updateCompanyId").value =
        row.cells[0].textContent;
      document.getElementById("updateCompanyName").value =
        row.cells[1].textContent;
      document.getElementById("updateCompanyNumber").value =
        row.cells[3].textContent;
      document.getElementById("updateCompanyEmail").value =
        row.cells[4].textContent;
      document.getElementById("updateCompanyAddress").value =
        row.cells[2].textContent;
      document.getElementById("updateModal").style.display = "block";
    }
  });

  document.querySelectorAll(".close").forEach((btn) => {
    btn.addEventListener("click", () => {
      updateModal.style.display = "none";
    });
  });

  // Close modal on outside click
  window.addEventListener("click", function (event) {
    if (event.target === document.getElementById("updateModal")) {
      document.getElementById("updateModal").style.display = "none";
    }
  });

  // Update form submission
  document
    .getElementById("updateCompanyForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const companyId = document.getElementById("updateCompanyId").value;
      const companyName = document.getElementById("updateCompanyName").value;
      const companyNumber = document.getElementById(
        "updateCompanyNumber"
      ).value;
      const companyEmail = document.getElementById("updateCompanyEmail").value;
      const companyAddress = document.getElementById(
        "updateCompanyAddress"
      ).value;

      axios
        .post(
          update_companies,
          {
            taxi_company_id: companyId,
            taxi_company_name: companyName,
            taxi_company_number: companyNumber,
            taxi_company_email: companyEmail,
            taxi_company_address: companyAddress,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          console.log("Update response:", response.data); // Debug output to check response structure
          if ((response.data.message = "Taxi company updated successfully.")) {
            // Check if the 'success' key is true
            Swal.fire({
              icon: "success",
              title: "Updated",
              text: "Company updated successfully!",
            });
            document.getElementById("updateModal").style.display = "none";
            fetchTaxiCompanies();
          } else {
            Swal.fire({
              icon: "error",
              title: "Update Failed",
              text:
                response.data.error ||
                "Error updating company. Please try again.",
            });
          }
        })
        .catch(function (error) {
          console.error("Update error:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error updating company. Please try again.",
          });
        });
    });
});
