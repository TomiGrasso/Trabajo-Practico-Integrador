import { getAllDoctors, createDoctor, deleteDoctor } from '../services/doctorsService.js';

document.addEventListener('DOMContentLoaded', () => {
    const addDoctorForm = document.getElementById('addDoctorForm');
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

                    <td>
                        <button class="btn btn-danger btn-sm delete-doctor" data-id="${doctor.id}">Eliminar</button>
                    </td>
                `;
                doctorsTableBody.appendChild(tr);
            });
        } catch (error) {
            console.error("Error al renderizar doctores:", error);
        }
    }

    addDoctorForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const doctorName = document.getElementById('doctorName').value;
        const doctorSpecialty = document.getElementById('doctorSpecialty').value;
        const doctorAvailableDays = document.getElementById('doctorAvailableDays').value;
        const newDoctor = {
            nombre: doctorName,
            especialidad: doctorSpecialty,
            diasDisponibles: doctorAvailableDays
        };
        try {
            await createDoctor(newDoctor);
            await renderDoctors();
            addDoctorForm.reset();
        } catch (error) {
            console.error("Error al agregar doctor:", error);
        }
    });

    doctorsTableBody.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-doctor')) {
            const doctorId = e.target.getAttribute('data-id');
            try {
                await deleteDoctor(doctorId);
                await renderDoctors();
            } catch (error) {
                console.error("Error al eliminar doctor:", error);
            }
        }
    });

    renderDoctors();
});