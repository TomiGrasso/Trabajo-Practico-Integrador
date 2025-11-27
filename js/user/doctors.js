import { getAllDoctors } from '../services/doctorsService.js';

document.addEventListener('DOMContentLoaded', () => {
    const doctorsTableBody = document.getElementById('doctorsTableBody');

    async function renderDoctors() {
        try {
            const doctors = await getAllDoctors();
            doctorsTableBody.innerHTML = '';
            doctors.forEach(doctor => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${doctor.nombre}</td>
                    <td>${doctor.especialidad}</td>
                    <td>${doctor.diasDisponibles}</td>
                `;
                doctorsTableBody.appendChild(tr);
            });
        } catch (error) {
            console.error("Error al renderizar doctores:", error);
        }
    }

    renderDoctors();
});