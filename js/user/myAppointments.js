import { getAppointmentsByUser } from "../services/appointmentsService.js";
import { getSession } from "../modules/auth.js";

document.addEventListener("DOMContentLoaded", async () => {
  const user = getSession();
  if (!user) {
    alert("Debés iniciar sesión.");
    window.location.href = "/pages/register-login/login.html";
    return;
  }

  const tbody = document.getElementById("myAppointmentsTableBody");

  try {
    const citas = await getAppointmentsByUser(user.id);

    if (citas.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center p-3">
            No tenés citas próximas.
          </td>
        </tr>
      `;
      return;
    }

    let html = "";

    for (const cita of citas) {
      
      const doctor = cita.doctor;

      html += `
        <tr>
          <td>${doctor.nombre}</td>
          <td>${doctor.especialidad}</td>
          <td>${cita.fecha}</td>
          <td>${cita.hora}</td>
          <td><span class="badge bg-primary">${cita.estado}</span></td>
          <td>
            <button class="btn btn-danger btn-sm" data-id="${cita.id}">
              Cancelar
            </button>
          </td>
        </tr>
      `;
    }

    tbody.innerHTML = html;

  } catch (error) {
    console.error("Error al cargar citas:", error);
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center text-danger p-3">
          Error al cargar tus citas.
        </td>
      </tr>
    `;
  }
});
