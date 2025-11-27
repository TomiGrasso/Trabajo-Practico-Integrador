import { getAllDoctors } from "./services/doctorsService.js";
import { createAppointment } from "./services/appointmentsService.js";

document.addEventListener("DOMContentLoaded", async () => {
    const doctorSelect = document.getElementById("doctor-select");
    const fechaInput = document.getElementById("fecha-cita");
    const horaSelect = document.getElementById("hora-cita");
    const form = document.getElementById("form-nueva-cita");

    // 1. Cargar doctores en el select
    const doctors = await getAllDoctors();
    doctors.forEach(d => {
        const option = document.createElement("option");
        option.value = d.id;
        option.textContent = `${d.nombre} ${d.apellido}`;
        doctorSelect.appendChild(option);
    });

    // 2. Generar las horas disponibles (ejemplo básico)
    for (let h = 8; h <= 18; h++) {
        const opt = document.createElement("option");
        opt.value = `${h}:00`;
        opt.textContent = `${h}:00`;
        horaSelect.appendChild(opt);
    }

    // 3. Enviar solicitud de cita
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (!user) {
            alert("Debes iniciar sesión");
            return;
        }

        const nuevaCita = {
            patientId: user.id,
            doctorId: doctorSelect.value,
            fecha: fechaInput.value,
            hora: horaSelect.value,
            estado: "pendiente"
        };

        await createAppointment(nuevaCita);
        alert("Cita solicitada correctamente");

        window.location.href = "my-appointments.html";
    });
});
