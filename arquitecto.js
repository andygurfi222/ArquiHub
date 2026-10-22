(() => {
    const arquitectos = [
        {
            id: 1,
            nombre: 'Sofía Méndez',
            imagen: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=640&h=720&q=85',
            ubicacion: 'Ciudad de México, MX',
            especialidad: 'Arquitectura sostenible',
            descripcion: 'Diseñadora de espacios serenos y eficientes. Sofía trabaja con materiales locales para crear arquitectura residencial que respira con su entorno.',
            experiencia: '12 años',
            proyectosCount: '28 proyectos',
            experienciaLabel: 'Experiencia',
            skills: ['Arquitectura residencial', 'Diseño conceptual', 'Revit', 'Diseño sustentable', 'Dirección de obra'],
            proyectos: [
                { nombre: 'Casa Ladera', tipo: 'Residencial', ubicacion: 'Valle de Bravo, MX', imagen: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&h=560&q=85', enlace: 'proyecto.html?id=1' },
                { nombre: 'Patio Norte', tipo: 'Uso mixto', ubicacion: 'Querétaro, MX', imagen: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&h=560&q=85', enlace: 'proyecto.html?id=3' }
            ]
        },
        {
            id: 2,
            nombre: 'Mateo Ríos',
            imagen: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&h=720&q=85',
            ubicacion: 'Mérida, Yucatán, MX',
            especialidad: 'Espacios residenciales',
            descripcion: 'Mateo combina líneas limpias, sombra y ventilación cruzada para diseñar hogares contemporáneos adaptados al clima y a la vida cotidiana.',
            experiencia: '9 años',
            proyectosCount: '19 proyectos',
            experienciaLabel: 'Experiencia',
            skills: ['Diseño residencial', 'AutoCAD', 'Modelado 3D', 'Visualización', 'Dirección de obra'],
            proyectos: [
                { nombre: 'Terreno La Encina', tipo: 'Residencial', ubicacion: 'Mérida, MX', imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&h=560&q=85', enlace: 'terreno.html?id=2' },
                { nombre: 'Casa Patio 04', tipo: 'Casa habitación', ubicacion: 'Progreso, MX', imagen: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&h=560&q=85', enlace: 'proyecto.html?id=1' }
            ]
        },
        {
            id: 3,
            nombre: 'Camila Torres',
            imagen: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=640&h=720&q=85',
            ubicacion: 'Guadalajara, Jalisco, MX',
            especialidad: 'Diseño urbano',
            descripcion: 'Camila desarrolla proyectos que conectan comunidad, paisaje y movilidad. Su práctica explora nuevas formas de habitar la ciudad.',
            experiencia: '11 años',
            proyectosCount: '34 proyectos',
            experienciaLabel: 'Experiencia',
            skills: ['Diseño urbano', 'Arquitectura pública', 'AutoCAD', 'Planeación', 'Investigación'],
            proyectos: [
                { nombre: 'Patio Norte', tipo: 'Uso mixto', ubicacion: 'Querétaro, MX', imagen: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&h=560&q=85', enlace: 'proyecto.html?id=3' },
                { nombre: 'Corredor 18', tipo: 'Espacio público', ubicacion: 'Guadalajara, MX', imagen: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&h=560&q=85', enlace: 'proyecto.html?id=2' }
            ]
        },
        {
            id: 4,
            nombre: 'Diego Vidal',
            imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=640&h=720&q=85',
            ubicacion: 'Monterrey, Nuevo León, MX',
            especialidad: 'Interiorismo',
            descripcion: 'Diego crea interiores cálidos y funcionales donde la materialidad y la luz construyen una experiencia cotidiana más consciente.',
            experiencia: '8 años',
            proyectosCount: '16 proyectos',
            experienciaLabel: 'Experiencia',
            skills: ['Interiorismo', 'Materialidad', 'Revit', 'Iluminación', 'Modelado 3D'],
            proyectos: [
                { nombre: 'Casa Ladera', tipo: 'Interiorismo', ubicacion: 'Valle de Bravo, MX', imagen: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&h=560&q=85', enlace: 'proyecto.html?id=1' },
                { nombre: 'Atelier Centro', tipo: 'Comercial', ubicacion: 'Monterrey, MX', imagen: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&h=560&q=85', enlace: 'proyecto.html?id=3' }
            ]
        }
    ];

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get('id'));
    const arquitecto = arquitectos.find((item) => item.id === id);
    const profile = document.querySelector('#architect-profile');

    const renderError = () => {
        profile.innerHTML = `
            <section class="error-state">
                <i class="fa-solid fa-compass-drafting" aria-hidden="true"></i>
                <h1>Arquitecto no encontrado</h1>
                <p>El enlace no contiene un ID válido o el perfil ya no está disponible.</p>
                <a href="home.html"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i>&nbsp; Volver a Home</a>
            </section>
        `;
    };

    const renderProfile = (item) => {
        profile.innerHTML = `
            <article>
                <section class="profile-identity" aria-labelledby="architect-name">
                    <div class="profile-avatar-wrap">
                        <img class="profile-avatar" src="${item.imagen}" alt="Retrato de ${item.nombre}">
                        <span class="profile-verified" aria-label="Perfil verificado"><i class="fa-solid fa-check" aria-hidden="true"></i></span>
                    </div>
                    <h1 id="architect-name">${item.nombre}</h1>
                    <p class="profile-specialty">${item.especialidad}</p>
                    <p class="profile-location"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${item.ubicacion}</p>
                    <div class="profile-actions">
                        <button class="profile-action primary" type="button" data-contact><i class="fa-regular fa-message" aria-hidden="true"></i> Contactar</button>
                        <button class="profile-action" type="button" data-follow aria-pressed="false"><i class="fa-regular fa-plus" aria-hidden="true"></i> Seguir</button>
                    </div>
                </section>

                <section class="profile-section" aria-labelledby="about-title">
                    <div class="section-heading"><h2 id="about-title">Características</h2><span>Perfil profesional</span></div>
                    <p class="profile-description">${item.descripcion}</p>
                    <div class="profile-facts">
                        <div class="profile-fact"><i class="fa-regular fa-clock" aria-hidden="true"></i><small>Años de experiencia</small><strong>${item.experiencia}</strong></div>
                        <div class="profile-fact"><i class="fa-solid fa-layer-group" aria-hidden="true"></i><small>Proyectos realizados</small><strong>${item.proyectosCount}</strong></div>
                    </div>
                </section>

                <section class="profile-section" aria-labelledby="skills-title">
                    <div class="section-heading"><h2 id="skills-title">Skills</h2><span>${item.skills.length} especialidades</span></div>
                    <div class="skills-list">${item.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join('')}</div>
                </section>

                <section class="profile-section" aria-labelledby="projects-title">
                    <div class="section-heading"><h2 id="projects-title">Proyectos</h2><span>Trabajo seleccionado</span></div>
                    <div class="project-list">${item.proyectos.map((project) => `
                        <a class="project-card" href="${project.enlace}">
                            <img class="project-image" src="${project.imagen}" alt="${project.nombre}" loading="lazy">
                            <div class="project-info">
                                <span class="project-type">${project.tipo}</span>
                                <h3>${project.nombre}</h3>
                                <p class="project-location"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${project.ubicacion}</p>
                                <span class="project-link">Ver detalle <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
                            </div>
                        </a>
                    `).join('')}</div>
                </section>
            </article>
        `;

        profile.querySelector('[data-contact]').addEventListener('click', () => {
            window.location.href = `requests.html?architectId=${item.id}`;
        });
        profile.querySelector('[data-follow]').addEventListener('click', (event) => {
            const button = event.currentTarget;
            const isFollowing = button.getAttribute('aria-pressed') !== 'true';
            button.setAttribute('aria-pressed', String(isFollowing));
            button.innerHTML = `<i class="fa-${isFollowing ? 'solid' : 'regular'} fa-check" aria-hidden="true"></i> ${isFollowing ? 'Siguiendo' : 'Seguir'}`;
        });
    };

    if (arquitecto) renderProfile(arquitecto);
    else renderError();
})();
