import { createUser, getAllUsers, loginUser as serviceLogin } from "../services/usersService.js"; 

const USUARIO_ROLE = "user";
const ADMIN_ROLE = "admin";
const SESSION_KEY = "userSession";

const ADMIN_DASHBOARD_PATH = "/pages/admin/home-admin.html";
const USER_DASHBOARD_PATH = "/pages/user/home-user.html";
const LOGIN_PATH = "/pages/register-login/login.html";

// Función para guardar el usuario en el navegador
function saveSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

// Función para obtener la sesión actual (usada en tu archivo de citas)
export function getSession() {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
}

// Función para cerrar sesión
export function logout() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = LOGIN_PATH;
}

/**
 * Registra un nuevo usuario con rol "user".
 * (Código original)
 */
export async function registerUser(nombre, email, password) {
    if (!nombre || !email || !password) {
        throw new Error("Nombre, email y contraseña son requeridos.");
    }

    try {
        const newUser = await createUser({
            nombre,
            email,
            password,
            role: USUARIO_ROLE 
        });
        
        saveSession(newUser);
        return newUser;
        
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        throw new Error("No se pudo registrar el usuario. Intenta de nuevo.");
    }
}

/**
 * Intenta iniciar sesión. Llama al servicio y guarda la sesión si es exitoso.
 */
export async function loginUser(email, password) {
    if (!email || !password) {
        throw new Error("Email y contraseña son requeridos.");
    }

    try {
        // Llama a loginUser en usersService.js a través del alias serviceLogin
        const user = await serviceLogin({ email, password });
        saveSession(user); // Guarda la sesión
        return user;
    } catch (err) {
        console.error("Error en loginUser (auth):", err);
        throw new Error(err?.message || "Error al iniciar sesión. Intenta nuevamente.");
    }
}

/**
 * Redirige al usuario al dashboard correcto según su rol.
 */
export function redirectToDashboard(user) {
    if (user?.role === ADMIN_ROLE) {
        window.location.href = ADMIN_DASHBOARD_PATH;
    } else if (user?.role === USUARIO_ROLE) {
        window.location.href = USER_DASHBOARD_PATH;
    } else {
        window.location.href = LOGIN_PATH; 
    }
}