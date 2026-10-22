(() => {
    const architects = [
        { id: 1, name: 'Sofía Méndez', specialty: 'Arquitectura sostenible', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=640&h=720&q=85' },
        { id: 2, name: 'Mateo Ríos', specialty: 'Espacios residenciales', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&h=720&q=85' },
        { id: 3, name: 'Camila Torres', specialty: 'Diseño urbano', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=640&h=720&q=85' },
        { id: 4, name: 'Diego Vidal', specialty: 'Interiorismo', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=640&h=720&q=85' }
    ];

    const projects = [
        { id: 1, name: 'Casa Ladera', location: 'Valle de Bravo, MX', type: 'Proyecto', status: '68% completo', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&h=560&q=85', href: 'proyecto.html?id=1' },
        { id: 2, name: 'Terreno La Encina', location: 'Mérida, MX', type: 'Terreno', status: '1,240 m²', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&h=560&q=85', href: 'terreno.html?id=2' },
        { id: 3, name: 'Patio Norte', location: 'Querétaro, MX', type: 'Proyecto', status: 'En colaboración', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&h=560&q=85', href: 'proyecto.html?id=3' }
    ];

    const architectList = document.querySelector('#architect-list');
    const projectList = document.querySelector('#project-list');
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('#home-search');
    const filterButtons = document.querySelectorAll('[data-filter]');

    const renderArchitects = (items) => {
        architectList.innerHTML = items.length ? items.map((architect) => `
            <a class="architect-card" href="arquitecto.html?id=${architect.id}">
                <div class="architect-image-wrap">
                    <img class="architect-image" src="${architect.image}" alt="Retrato de ${architect.name}" loading="lazy">
                </div>
                <h3>${architect.name}</h3>
                <p>${architect.specialty}</p>
            </a>
        `).join('') : '<p class="empty-state">No encontramos arquitectos con esa búsqueda.</p>';
    };

    const renderProjects = (items) => {
        projectList.innerHTML = items.length ? items.map((project) => `
            <a class="project-card" href="${project.href || 'terreno.html?id=' + project.id}">
                <img class="project-image" src="${project.image}" alt="Imagen de ${project.name}" loading="lazy">
                <div class="project-info">
                    <span class="project-tag">${project.type}</span>
                    <h3>${project.name}</h3>
                    <p class="project-location"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${project.location}</p>
                    <div class="project-meta"><span>Oportunidad</span><strong>${project.status}</strong></div>
                </div>
            </a>
        `).join('') : '<p class="empty-state">No encontramos proyectos con esa búsqueda.</p>';
    };

    const filterContent = (term = '') => {
        const normalizedTerm = term.trim().toLowerCase();
        const matchingArchitects = architects.filter(({ name, specialty }) => `${name} ${specialty}`.toLowerCase().includes(normalizedTerm));
        const matchingProjects = projects.filter(({ name, location, type }) => `${name} ${location} ${type}`.toLowerCase().includes(normalizedTerm));
        renderArchitects(matchingArchitects);
        renderProjects(matchingProjects);
    };

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        filterContent(searchInput.value);
    });
    searchInput.addEventListener('input', () => filterContent(searchInput.value));
    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            filterButtons.forEach((item) => item.classList.remove('is-selected'));
            button.classList.add('is-selected');
            filterContent(searchInput.value);
        });
    });

    renderArchitects(architects);
    renderProjects(projects);
})();
