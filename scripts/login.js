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
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      console.log(username, password); // Debugging line to check the inputs
      const response = await axios.post(
        loginUrl,
        {
          email: username, // Assuming your backend expects an email, not a username
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data); // Handling the response from your backend

      if (response.data.success) {
        // Assuming the JWT token is in response.data.jwt
        const token = response.data.jwt;
        const decodedToken = jwt_decode(token);
        console.log("Decoded JWT Token:", decodedToken);

        // Store the JWT token in local storage
        localStorage.setItem("jwtToken", token);

        if (decodedToken.role === "admin") {
          alert("Admin login successful");
          window.location.href = "admin/admin.html"; // Redirect to admin dashboard if login is successful
        } else {
          alert("User login successful");
          // window.location.href = "/dashboard"; // Redirect to user dashboard if login is successful
        }
      } else {
        alert(response.data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login."); // Handling errors
    }
  });
});
