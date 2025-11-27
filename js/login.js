import { loginUser, redirectToDashboard } from "./modules/auth.js"; 

const formLogin = document.getElementById("form-login");

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const selectedRole = localStorage.getItem("selectedRole");  // "user" o "admin"

  if (!email || !password) {
    alert("Por favor, completá todos los campos.");
    return;
  }

  try {
    // Usa la función modular: autentica y guarda la sesión automáticamente
    const user = await loginUser(email, password);

    // Mantiene la verificación del rol aquí (es responsabilidad de la UI del login)
    if (user.role !== selectedRole) {
      alert("Este usuario no pertenece al rol seleccionado en el inicio.");
      // Si el rol no coincide, eliminamos la sesión que se guardó en auth.js
      localStorage.removeItem("userSession"); 
      return;   
    }

    // Redirecciona
    redirectToDashboard(user);

  } catch (error) {
    console.error(error);
    // Muestra el mensaje de error claro (ya sea de credenciales o de red)
    alert(error.message);
  }
});