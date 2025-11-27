import { getSession, logout } from '../modules/auth.js';
import { getAllAppointments } from '../services/appointmentsService.js';

document.addEventListener('DOMContentLoaded', async () => {
    const user = getSession();

    if (!user) {
        window.location.href = '/pages/register-login/login.html';
        return;
    }

    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }

    const allAppointments = await getAllAppointments();
    const userAppointments = allAppointments.filter(appointment => appointment.patientId === user.id);

    const pendingAppointments = userAppointments.filter(appointment => appointment.estado === 'Pendiente').length;
    const confirmedAppointments = userAppointments.filter(appointment => appointment.estado === 'Confirmado').length;
    const cancelledAppointments = userAppointments.filter(appointment => appointment.estado === 'Cancelado').length;

    document.getElementById('metric-pending-appointments').textContent = pendingAppointments;
    document.getElementById('metric-confirmed-appointments').textContent = confirmedAppointments;
    
    document.getElementById('pending-count').textContent = pendingAppointments;
    document.getElementById('confirmed-count').textContent = confirmedAppointments;
    document.getElementById('cancelled-count').textContent = cancelledAppointments;

    const options = {
        series: [confirmedAppointments, pendingAppointments, cancelledAppointments],
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: ['Confirmados', 'Pendientes', 'Cancelados'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const chart = new ApexCharts(document.querySelector("#status-pie-chart"), options);
    chart.render();
});
