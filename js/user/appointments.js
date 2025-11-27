import { getAllDoctors } from "../services/doctorsService.js";
import { createAppointment } from "../services/appointmentsService.js";
import { showAlert } from "../modules/utils.js";
import { getSession } from "../modules/auth.js"; // Se importa getSession


document.addEventListener('DOMContentLoaded', () => {
    const doctorSelect = document.getElementById('doctor-select');
    const form = document.getElementById('form-nueva-cita');
    const horaCitaSelect = document.getElementById('hora-cita');

    getAllDoctors().then(response => {
        const doctors = response;
        doctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = `${doctor.nombre} - ${doctor.especialidad}`;
            doctorSelect.appendChild(option);
        });
    });


    const availableHours = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
    availableHours.forEach(hour => {
        const option = document.createElement('option');
        option.value = hour;
        option.textContent = hour;
        horaCitaSelect.appendChild(option);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const doctorId = doctorSelect.value;
        const fecha = document.getElementById('fecha-cita').value;
        const hora = horaCitaSelect.value;

        // 1. Obtener la sesión del usuario
        const user = getSession(); // Obtiene el objeto completo del usuario en sesión

        // 2. Validar que el usuario esté logeado
        if (!user || !user.id) {
            showAlert('Error: No se encontró la sesión del paciente. Por favor, inicie sesión.', 'danger');
            return; 
        }

        // 3. Asignar el ID real
        const patientId = user.id; 
        const estado = 'pendiente';

        // Se agrega patientId a la condición de validación
        if (doctorId && fecha && hora && patientId) { 
            const appointmentData = {
                patientId: parseInt(patientId), // Usa el ID del usuario en sesión
                doctorId: parseInt(doctorId),
                fecha,
                hora,
                estado
            };

            createAppointment(appointmentData)
                .then(() => {
                    showAlert('Cita creada exitosamente', 'success');
                    form.reset();
                })
                .catch(error => {
                    console.error('Error al crear la cita:', error);
                    showAlert('Hubo un error al crear la cita. Por favor, intente de nuevo.', 'danger');
                });
        } else {
            showAlert('Por favor, complete todos los campos.', 'warning');
        }
    });
});