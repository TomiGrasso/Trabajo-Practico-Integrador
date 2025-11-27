import {apiAP} from "./apiConfig.js";

const APPOINTMENTS_PATH = "/appointments";

export async function getAllAppointments() {
  return apiAP.get(APPOINTMENTS_PATH);
}

export async function getAppointmentById(id) {
  return apiAP.get(`${APPOINTMENTS_PATH}/${id}`);
}

export async function createAppointment({ patientId, doctor, fecha, hora, estado }) {
  return apiAP.post(APPOINTMENTS_PATH, { patientId, doctor, fecha, hora, estado });
}

export async function updateAppointment(id, { patientId, doctor, fecha, hora, estado }) {
  return apiAP.put(`${APPOINTMENTS_PATH}/${id}`, { patientId, doctor, fecha, hora, estado });
}

export async function deleteAppointment(id) {
  return apiAP.delete(`${APPOINTMENTS_PATH}/${id}`);
}

export async function getAppointmentsByUser(userId) {
  const allAppointments = await getAllAppointments();
  return allAppointments.filter(ap => Number(ap.patientId) === Number(userId));
}
