import { getUser, logout } from '../modules/auth.js';
import { getDoctors } from '../services/doctorsService.js';
import { addAppointment } from '../services/appointmentsService.js';

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

    const doctorSelect = document.getElementById('doctor-select');
    const doctors = getDoctors();

    if (doctorSelect) {
        doctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = `${doctor.name} - ${doctor.specialty}`;
            doctorSelect.appendChild(option);
        });
    }

    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const doctorId = document.getElementById('doctor-select').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const newAppointment = {
                userId: user.id,
                doctorId,
                date,
                time,
                status: 'pending'
            };
            addAppointment(newAppointment);
            alert('Appointment created successfully');
            window.location.href = '/pages/user/my-appointments.html';
        });
    }
});
