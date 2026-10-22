(() => {
    const statuses = document.querySelectorAll('[data-profile-status]');
    statuses.forEach((status) => {
        const key = `arqhub-perfil-${status.dataset.profileStatus}`;
        try {
            const profile = JSON.parse(localStorage.getItem(key) || 'null');
            if (profile?.nombre && profile?.ubicacion) status.textContent = 'Perfil guardado · Ver y editar';
        } catch {
            status.textContent = 'No se pudo leer el perfil local';
        }
    });
})();
