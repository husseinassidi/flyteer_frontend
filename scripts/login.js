document.addEventListener("DOMContentLoaded", function () {
  const loginUrl =
    "http://localhost/grpProject%232/flyteer_backend/api/user/login.php";
  const form = document.querySelector(".login-form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      console.log(email, password);
      const response = await axios.post(
        loginUrl,
        {
          email: email,
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
          window.location.href = "admin/admin.html";
        } else {
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
