import { getUser, logout } from '../modules/auth.js';
import { getAppointments } from '../services/appointmentsService.js';
import { getAllUsers } from '../services/usersService.js';
import { getDoctors } from '../services/doctorsService.js';

document.addEventListener('DOMContentLoaded', () => {
    const user = getUser();
    if (!user || user.role !== 'admin') {
        logout();
        return;
    }

    const usernameDisplay = document.getElementById('username-display');
    if (usernameDisplay) {
        usernameDisplay.textContent = user.username;
    }

    const usernameDisplay2 = document.getElementById('username-display-2');
    if (usernameDisplay2) {
        usernameDisplay2.textContent = user.username;
    }

    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }

    const appointments = getAppointments();
    const users = getAllUsers();
    const doctors = getDoctors();

    const totalAppointments = document.getElementById('total-appointments');
    if (totalAppointments) {
        totalAppointments.textContent = appointments.length;
    }

    const totalUsers = document.getElementById('total-users');
    if (totalUsers) {
        totalUsers.textContent = users.length;
    }

    const totalDoctors = document.getElementById('total-doctors');
    if (totalDoctors) {
        totalDoctors.textContent = doctors.length;
    }
});
