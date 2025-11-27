document.addEventListener('DOMContentLoaded', () => {
    const nameEl = document.getElementById('profile-username');
    const emailEl = document.getElementById('profile-email');
    const disp1 = document.getElementById('username-display');
    const disp2 = document.getElementById('username-display-2');

    const raw = localStorage.getItem('userSession'); // <-- usa la clave definida en auth.js
    if (!raw) return;

    try {
        const u = JSON.parse(raw);
        const name = u.name || u.nombre || u.username || u.fullName || u.displayName || '';
        const email = u.email || u.mail || u.correo || '';

        if (nameEl) nameEl.textContent = name;
        if (emailEl) {
            emailEl.textContent = email;
            emailEl.style.display = email ? '' : 'none';
        }
        if (disp1) disp1.textContent = name || 'Usuario';
        if (disp2) disp2.textContent = name || 'Usuario';
    } catch (e) {
        
    }
});