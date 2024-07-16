document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  const loginUrl =
    "http://localhost/grpProject%232/flyteer_backend/api/user/login.php";
  const form = document.querySelector(".login-form");

  if (form) {
    console.log("Form found");
  } else {
    console.log("Form not found");
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      console.log(username, password);
      const response = await axios.post(
        loginUrl,
        {
          email: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      if (response.data.success) {
        const token = response.data.jwt;
        const decodedToken = jwt_decode(token);
        console.log("Decoded JWT Token:", decodedToken);

        localStorage.setItem("jwtToken", token);

        if (decodedToken.role === "admin") {
          alert("Admin login successful");
          window.location.href = "admin/admin.html";
        } else {
          alert("User login successful");
          window.location.href = "/dashboard";
        }
      } else {
        alert(response.data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  });
});
