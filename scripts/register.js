document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;

    try {
      const response = await axios.post(
        "http://localhost/grpProject%232/flyteer_backend/api/user/register.php",
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          phone: phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "User created successfully") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User registered successfully!",
        });
        window.location.href = "login.html";
        document.getElementById("registerForm").reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error registering user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error registering user. Please try again.",
      });
    }
  });
