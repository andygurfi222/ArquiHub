(() => {
    const projects = [
        { id: 1, name: 'Casa Moderna', location: 'Buenos Aires, Argentina', architect: 'Juan Pérez', type: 'Vivienda residencial', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&h=700&q=85' },
        { id: 2, name: 'Casa Patio Norte', location: 'Córdoba, Argentina', architect: 'Sofía Méndez', type: 'Arquitectura sostenible', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1100&h=700&q=85' },
        { id: 3, name: 'Refugio del Bosque', location: 'Bariloche, Argentina', architect: 'Mateo Ríos', type: 'Vivienda de descanso', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1100&h=700&q=85' },
        { id: 4, name: 'Casa Luz', location: 'Mendoza, Argentina', architect: 'Camila Torres', type: 'Vivienda contemporánea', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1100&h=700&q=85' },
        { id: 5, name: 'Casa del Jardín', location: 'Rosario, Argentina', architect: 'Diego Vidal', type: 'Vivienda familiar', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&h=700&q=85' },
        { id: 6, name: 'Casa Horizonte', location: 'Mar del Plata, Argentina', architect: 'Lucía Acosta', type: 'Vivienda costera', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1100&h=700&q=85' }
    ];
    const grid = document.querySelector('#projects-grid');
    const searchForm = document.querySelector('#project-search');
    const searchInput = document.querySelector('#project-search-input');
    const renderProjects = (items) => {
        grid.innerHTML = items.length ? items.map((project) => `
        <article class="project-card">
            <div class="project-image-wrap"><img class="project-image" src="${project.image}" alt="Fotografía de ${project.name}" loading="lazy"><span class="project-type">Proyecto</span></div>
            <div class="project-card-body"><h2>${project.name}</h2><p class="project-location"><i class="fa-solid fa-location-dot" aria-hidden="true"></i>${project.location}</p><p class="project-architect">Arquitecto:<strong>${project.architect}</strong></p><div class="project-footer"><span class="project-kind">${project.type}</span><a class="view-button" href="proyecto.html?id=explorar-${project.id}">Ver <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></div></div>
        </article>
        `).join('') : '<p class="empty-state">No encontramos proyectos con esa búsqueda.</p>';
    };
    const filterProjects = () => {
        const term = searchInput.value.trim().toLowerCase();
        renderProjects(projects.filter((project) => `${project.name} ${project.location} ${project.architect} ${project.type}`.toLowerCase().includes(term)));
    };
    searchForm.addEventListener('submit', (event) => { event.preventDefault(); filterProjects(); });
    searchInput.addEventListener('input', filterProjects);
    renderProjects(projects);
})();
