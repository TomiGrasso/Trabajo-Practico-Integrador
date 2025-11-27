import { getUser, logout } from '../modules/auth.js';
import { getAppointmentsByUser } from '../services/appointmentsService.js';
import { getDoctorById } from '../services/doctorsService.js';

document.addEventListener('DOMContentLoaded', () => {
    const user = getUser();
    if (!user) {
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

    const appointments = getAppointmentsByUser(user.id);
    const appointmentsTableBody = document.getElementById('appointments-table-body');

    if (appointmentsTableBody) {
        if (appointments.length > 0) {
            appointments.forEach(appointment => {
                const doctor = getDoctorById(appointment.doctorId);
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${doctor ? doctor.name : 'N/A'}</td>
                    <td>${appointment.date}</td>
                    <td>${appointment.time}</td>
                    <td><span class="badge ${appointment.status === 'confirmed' ? 'bg-success' : 'bg-warning'}">${appointment.status}</span></td>
                `;
                appointmentsTableBody.appendChild(row);
            });
        } else {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="4" class="text-center">No appointments found</td>`;
            appointmentsTableBody.appendChild(row);
        }
    }
});
