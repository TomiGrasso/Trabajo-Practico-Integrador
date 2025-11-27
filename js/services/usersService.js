import { apiUD } from "./apiConfig.js";

const USERS_PATH = "/users";

export async function getAllUsers() {
  return apiUD.get(USERS_PATH);
}

export async function getUserById(id) {
  return apiUD.get(`${USERS_PATH}/${id}`);
}

export async function createUser({ nombre, email, password, role }) {
  return apiUD.post(USERS_PATH, { nombre, email, password, role });
}

export async function updateUser(id, { nombre, email, password, role }) {
  return apiUD.put(`${USERS_PATH}/${id}`, { nombre, email, password, role });
}

export async function deleteUser(id) {
  return apiUD.delete(`${USERS_PATH}/${id}`);
}

// FUNCIÓN DE LOGIN AÑADIDA
export async function loginUser({ email, password }) {
  try {
    const users = await getAllUsers();

    // Busca al usuario por email y contraseña
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      // Lanza un error si no hay coincidencia
      throw new Error("Credenciales inválidas. Email o contraseña incorrectos.");
    }

    // Retorna el usuario sin la contraseña (por seguridad)
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;

  } catch (error) {
    if (error.message.includes("Credenciales")) {
      throw error;
    }
    throw new Error("Error de red al intentar iniciar sesión.");
  }
}