const auth = () => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    const decodedToken = jwt_decode(token);
    if (decodedToken.role !== "admin") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "access denied",
      });
      window.location.href = "/pages/login.html";
      return;
    }
  } else {
    window.location.href = "/pages/login.html";
    return;
  }
};
export default auth;
