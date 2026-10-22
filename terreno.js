(() => {
    const terrenos = [
        {
            id: 1,
            nombre: 'Casa Ladera',
            imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&h=900&q=85',
            ubicacion: 'Valle de Bravo, Estado de México',
            descripcion: 'Un terreno en pendiente con vistas abiertas al bosque, ideal para una casa de descanso integrada al paisaje.',
            superficie: '1,860 m²',
            ancho: '31 m',
            largo: '60 m',
            orientacion: 'Sur poniente',
            tipo: 'Residencial campestre',
            servicios: 'Agua, luz y acceso',
            zonificacion: 'Habitacional baja',
            precio: '$2,450,000 MXN',
            rentabilidad: '68% proyectada'
        },
        {
            id: 2,
            nombre: 'Terreno La Encina',
            imagen: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&h=900&q=85',
            ubicacion: 'Mérida, Yucatán',
            descripcion: 'Lote plano y luminoso dentro de una zona de crecimiento, con conexión rápida a servicios y vialidades principales.',
            superficie: '1,240 m²',
            ancho: '20 m',
            largo: '62 m',
            orientacion: 'Oriente',
            tipo: 'Residencial urbano',
            servicios: 'Agua, luz y drenaje',
            zonificacion: 'H4 residencial',
            precio: '$1,890,000 MXN',
            rentabilidad: '54% proyectada'
        },
        {
            id: 3,
            nombre: 'Patio Norte',
            imagen: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&h=900&q=85',
            ubicacion: 'Querétaro, Querétaro',
            descripcion: 'Espacio con vocación mixta y excelente conectividad para desarrollar un conjunto de baja densidad.',
            superficie: '2,480 m²',
            ancho: '40 m',
            largo: '62 m',
            orientacion: 'Norte',
            tipo: 'Uso mixto',
            servicios: 'Todos los servicios',
            zonificacion: 'Mixta barrial',
            precio: '$4,200,000 MXN',
            rentabilidad: '72% proyectada'
        }
    ];

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get('id'));
    const terreno = terrenos.find((item) => item.id === id);
    const detail = document.querySelector('#terrain-detail');
    const savedKey = `arqhub-land-${id}-saved`;

    const renderError = () => {
        detail.innerHTML = `
            <section class="error-state">
                <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
                <h1>Terreno no encontrado</h1>
                <p>El enlace no contiene un ID válido o el terreno ya no está disponible.</p>
                <a href="home.html"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i>&nbsp; Volver a Home</a>
            </section>
        `;
    };

    const renderTerrain = (item) => {
        detail.innerHTML = `
            <article>
                <section class="detail-hero" aria-labelledby="terrain-title">
                    <img class="detail-hero-image" src="${item.imagen}" alt="Vista de ${item.nombre}">
                    <span class="hero-badge">${item.tipo}</span>
                    <button class="hero-save" type="button" aria-label="Guardar terreno" aria-pressed="false">
                        <i class="fa-regular fa-bookmark" aria-hidden="true"></i>
                    </button>
                    <div class="hero-caption">
                        <h1 id="terrain-title">${item.nombre}</h1>
                        <p><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${item.ubicacion}</p>
                    </div>
                </section>

                <section class="detail-intro">
                    <h2>Un lugar para darle forma a tu próxima idea.</h2>
                    <p class="detail-location"><i class="fa-solid fa-map-pin" aria-hidden="true"></i> ${item.ubicacion}</p>
                    <p class="detail-description">${item.descripcion}</p>
                </section>

                <section class="detail-section" aria-labelledby="features-title">
                    <div class="detail-section-heading">
                        <h2 id="features-title">Características</h2>
                        <span>Información del terreno</span>
                    </div>
                    <div class="feature-grid">
                        <div class="feature-item"><i class="fa-solid fa-vector-square" aria-hidden="true"></i><span class="feature-label">Superficie</span><strong class="feature-value">${item.superficie}</strong></div>
                        <div class="feature-item"><i class="fa-solid fa-arrows-left-right" aria-hidden="true"></i><span class="feature-label">Ancho</span><strong class="feature-value">${item.ancho}</strong></div>
                        <div class="feature-item"><i class="fa-solid fa-arrows-up-down" aria-hidden="true"></i><span class="feature-label">Largo</span><strong class="feature-value">${item.largo}</strong></div>
                        <div class="feature-item"><i class="fa-solid fa-compass" aria-hidden="true"></i><span class="feature-label">Orientación</span><strong class="feature-value">${item.orientacion}</strong></div>
                        <div class="feature-item"><i class="fa-solid fa-droplet" aria-hidden="true"></i><span class="feature-label">Servicios</span><strong class="feature-value">${item.servicios}</strong></div>
                        <div class="feature-item"><i class="fa-solid fa-city" aria-hidden="true"></i><span class="feature-label">Zonificación</span><strong class="feature-value">${item.zonificacion}</strong></div>
                    </div>
                </section>

                <section class="opportunity-card" aria-label="Resumen financiero">
                    <div><p>Precio de oportunidad</p><strong>${item.precio}</strong></div>
                    <span class="opportunity-icon"><i class="fa-solid fa-chart-line" aria-hidden="true"></i></span>
                </section>
                <a class="contact-button" href="requests.html"><i class="fa-regular fa-message" aria-hidden="true"></i> Solicitar información</a>
            </article>
        `;

        const saveButton = detail.querySelector('.hero-save');
        const isSaved = localStorage.getItem(savedKey) === 'true';
        updateSaveButton(saveButton, isSaved);
        saveButton.addEventListener('click', () => {
            const nextState = saveButton.getAttribute('aria-pressed') !== 'true';
            localStorage.setItem(savedKey, String(nextState));
            updateSaveButton(saveButton, nextState);
        });
    };

    const updateSaveButton = (button, isSaved) => {
        button.classList.toggle('is-saved', isSaved);
        button.setAttribute('aria-pressed', String(isSaved));
        button.setAttribute('aria-label', isSaved ? 'Quitar de guardados' : 'Guardar terreno');
        button.innerHTML = `<i class="fa-${isSaved ? 'solid' : 'regular'} fa-bookmark" aria-hidden="true"></i>`;
    };

    if (terreno) renderTerrain(terreno);
    else renderError();
})();
