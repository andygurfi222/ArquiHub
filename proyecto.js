(() => {
    const root = document.querySelector('#project-root');
    const id = new URLSearchParams(window.location.search).get('id');
    const profileKeys = ['arqhub-perfil-arquitecto'];
    const demoProjects = [
        { id: '1', nombre: 'Casa Ladera', ubicacion: 'Valle de Bravo, México', arquitecto: 'Sofía Méndez', tipo: 'Residencial', estilo: 'Sustentable contemporáneo', superficie: '250 m²', imagen: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&h=560&q=85', descripcion: 'Una vivienda contemporánea que integra materiales locales y el paisaje natural.' },
        { id: '2', nombre: 'Terreno La Encina', ubicacion: 'Mérida, Yucatán', arquitecto: 'Mateo Ríos', tipo: 'Residencial', estilo: 'Moderno tropical', superficie: '180 m²', imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&h=560&q=85', descripcion: 'Propuesta de vivienda con ventilación cruzada y espacios adaptados al clima local.' },
        { id: '3', nombre: 'Patio Norte', ubicacion: 'Querétaro, México', arquitecto: 'Camila Torres', tipo: 'Uso mixto', estilo: 'Contemporáneo urbano', superficie: '620 m²', imagen: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&h=560&q=85', descripcion: 'Proyecto de uso mixto que conecta espacios de trabajo, vivienda y vida urbana.' },
        { id: 'explorar-1', nombre: 'Casa Moderna', ubicacion: 'Buenos Aires, Argentina', arquitecto: 'Juan Pérez', tipo: 'Vivienda residencial', imagen: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&h=700&q=85' },
        { id: 'explorar-2', nombre: 'Casa Patio Norte', ubicacion: 'Córdoba, Argentina', arquitecto: 'Sofía Méndez', tipo: 'Arquitectura sostenible', imagen: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1100&h=700&q=85' },
        { id: 'explorar-3', nombre: 'Refugio del Bosque', ubicacion: 'Bariloche, Argentina', arquitecto: 'Mateo Ríos', tipo: 'Vivienda de descanso', imagen: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1100&h=700&q=85' },
        { id: 'explorar-4', nombre: 'Casa Luz', ubicacion: 'Mendoza, Argentina', arquitecto: 'Camila Torres', tipo: 'Vivienda contemporánea', imagen: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1100&h=700&q=85' },
        { id: 'explorar-5', nombre: 'Casa del Jardín', ubicacion: 'Rosario, Argentina', arquitecto: 'Diego Vidal', tipo: 'Vivienda familiar', imagen: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&h=700&q=85' },
        { id: 'explorar-6', nombre: 'Casa Horizonte', ubicacion: 'Mar del Plata, Argentina', arquitecto: 'Lucía Acosta', tipo: 'Vivienda costera', imagen: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1100&h=700&q=85' }
    ];
    const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);

    const read = (key) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    };

    let project;
    let architectName = 'Arquitecto/a de ArquiHub';
    try {
        const proposals = read('arqhub-proyectos') || [];
        project = proposals.find((item) => String(item.id) === String(id));
        if (!project) {
            for (const key of profileKeys) {
                const profile = read(key);
                const match = profile?.projects?.find((item) => String(item.id) === String(id));
                if (match) {
                    project = match;
                    architectName = profile.nombre || architectName;
                    break;
                }
            }
        } else {
            const profile = read('arqhub-perfil-arquitecto');
            if (profile?.nombre) architectName = profile.nombre;
        }
        if (!project) project = demoProjects.find((item) => item.id === String(id));
        if (project?.arquitecto) architectName = project.arquitecto;
    } catch {
        root.innerHTML = '<p class="profile-error" role="alert">No se pudieron leer los datos del proyecto guardados en este navegador.</p>';
        return;
    }

    if (!project) {
        root.innerHTML = `<a class="profile-crumb" href="perfil-arquitecto.html"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Volver al perfil arquitecto</a><section class="profile-error" role="alert"><h1>Proyecto no encontrado</h1><p>Este proyecto no está disponible en el almacenamiento local de este navegador.</p></section>`;
        return;
    }

    const terrainId = project.terrenoId;
    let terrain;
    if (terrainId) {
        try {
            terrain = (read('arqhub-terrenos') || []).find((item) => String(item.id) === String(terrainId));
        } catch {
            root.insertAdjacentHTML('afterbegin', '<p class="profile-error" role="alert">No se pudo leer el terreno asociado.</p>');
        }
    }
    const image = project.imagen || project.imagenes?.find((item) => item.datos)?.datos || '';
    const description = project.descripcion || project.descripcionProfesional || '';
    root.innerHTML += `
        <a class="profile-crumb" href="perfil-arquitecto.html"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Volver al perfil arquitecto</a>
        <div class="profile-page-heading"><span class="section-label">Portfolio profesional</span><h1 class="profile-page-title">${escapeHtml(project.nombre || 'Proyecto arquitectónico')}</h1></div>
        ${image ? `<img class="project-detail-image" src="${escapeHtml(image)}" alt="Imagen de ${escapeHtml(project.nombre || 'proyecto')}">` : ''}
        <section class="project-detail-copy"><h2>Información del proyecto</h2>
            <p><strong>Arquitecto:</strong> ${escapeHtml(architectName)}</p>
            ${project.tipo ? `<p><strong>Tipo:</strong> ${escapeHtml(project.tipo)}</p>` : ''}
            ${project.estilo ? `<p><strong>Estilo:</strong> ${escapeHtml(project.estilo)}</p>` : ''}
            ${project.ubicacion ? `<p><strong>Ubicación:</strong> ${escapeHtml(project.ubicacion)}</p>` : ''}
            ${project.superficie ? `<p><strong>Superficie:</strong> ${escapeHtml(project.superficie)}${typeof project.superficie === 'number' ? ' m²' : ''}</p>` : ''}
            ${description ? `<p>${escapeHtml(description)}</p>` : ''}
            ${terrainId ? `<a class="project-relation" href="terreno.html?id=${encodeURIComponent(terrainId)}"><i class="fa-solid fa-link" aria-hidden="true"></i>${escapeHtml(terrain?.nombre || `Terreno asociado #${terrainId}`)}</a>` : ''}
        </section>`;
    document.title = `ArquiHub | ${project.nombre || 'Proyecto'}`;
})();
