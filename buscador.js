(() => {
    const terrenos = [
        { id: 1, nombre: 'Casa Ladera', ubicacion: 'Valle de Bravo, México', imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&h=760&q=85', detalle: '31 x 60 m · 1,860 m² · Agua y luz', precio: 2450000, precioTexto: '$2.450.000 MXN', rentabilidad: 68, orientacion: 'Sur poniente', servicios: 'Agua, luz y acceso', zonificacion: 'Habitacional baja', ancho: 31, largo: 60, superficie: 1860, caracteristicas: 'bosque residencial campestre naturaleza' },
        { id: 2, nombre: 'Terreno La Encina', ubicacion: 'Mérida, Yucatán', imagen: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&h=760&q=85', detalle: '20 x 62 m · 1,240 m² · Todos los servicios', precio: 1890000, precioTexto: '$1.890.000 MXN', rentabilidad: 54, orientacion: 'Oriente', servicios: 'Agua, luz y drenaje', zonificacion: 'H4 residencial', ancho: 20, largo: 62, superficie: 1240, caracteristicas: 'plano residencial urbano crecimiento' },
        { id: 3, nombre: 'Patio Norte', ubicacion: 'Querétaro, México', imagen: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&h=760&q=85', detalle: '40 x 62 m · 2,480 m² · Uso mixto', precio: 4200000, precioTexto: '$4.200.000 MXN', rentabilidad: 72, orientacion: 'Norte', servicios: 'Todos los servicios', zonificacion: 'Mixta barrial', ancho: 40, largo: 62, superficie: 2480, caracteristicas: 'uso mixto urbano baja densidad' }
    ];
    const arquitectos = [
        { id: 1, nombre: 'Sofía Méndez', ubicacion: 'Ciudad de México, MX', imagen: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=640&h=720&q=85', detalle: 'Arquitectura residencial · 12 años', especialidad: 'Arquitectura sostenible viviendas residenciales casas modernas', experiencia: 12, disponibilidad: 'Disponible' },
        { id: 2, nombre: 'Mateo Ríos', ubicacion: 'Mérida, Yucatán, MX', imagen: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&h=720&q=85', detalle: 'Espacios residenciales · 9 años', especialidad: 'Viviendas modernas arquitectura residencial diseño tropical', experiencia: 9, disponibilidad: 'Disponible' },
        { id: 3, nombre: 'Camila Torres', ubicacion: 'Guadalajara, Jalisco, MX', imagen: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=640&h=720&q=85', detalle: 'Diseño urbano · 11 años', especialidad: 'Urbanismo edificios arquitectura pública planeación urbana', experiencia: 11, disponibilidad: 'En proyectos' },
        { id: 4, nombre: 'Diego Vidal', ubicacion: 'Monterrey, Nuevo León, MX', imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=640&h=720&q=85', detalle: 'Interiorismo · 8 años', especialidad: 'Interiorismo comercial viviendas diseño de interiores', experiencia: 8, disponibilidad: 'Disponible' }
    ];
    const proyectos = [
        { id: 1, nombre: 'Casa Ladera', ubicacion: 'Valle de Bravo, México', imagen: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&h=560&q=85', detalle: 'Sofía Méndez · 250 m²', tipo: 'Residencial', estilo: 'Sustentable contemporáneo', superficie: 250, presupuesto: 2450000 },
        { id: 2, nombre: 'Terreno La Encina', ubicacion: 'Mérida, Yucatán', imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&h=560&q=85', detalle: 'Mateo Ríos · 180 m²', tipo: 'Residencial', estilo: 'Moderno tropical', superficie: 180, presupuesto: 1890000 },
        { id: 3, nombre: 'Patio Norte', ubicacion: 'Querétaro, México', imagen: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&h=560&q=85', detalle: 'Camila Torres · 620 m²', tipo: 'Uso mixto', estilo: 'Contemporáneo urbano', superficie: 620, presupuesto: 4200000 }
    ];

    const state = { category: 'all' };
    const searchForm = document.querySelector('#global-search');
    const searchInput = document.querySelector('#search-input');
    const filterPanel = document.querySelector('#filter-panel');
    const resultsList = document.querySelector('#results-list');
    const resultsCount = document.querySelector('#results-count');
    const sortSelect = document.querySelector('#sort-select');
    const filterValues = {};

    const field = (label, name, type = 'text', options = []) => {
        const control = type === 'select'
            ? `<select data-filter="${name}"><option value="">Todos</option>${options.map((option) => `<option value="${option.toLowerCase()}">${option}</option>`).join('')}</select>`
            : `<input data-filter="${name}" type="${type}" placeholder="${label}">`;
        return `<div class="filter-field"><label for="filter-${name}">${label}</label>${control.replace('data-filter', `id="filter-${name}" data-filter`)}</div>`;
    };

    const renderFilters = () => {
        const commonLocation = field('Ubicación', 'location');
        if (state.category === 'terrain') {
            filterPanel.innerHTML = `${commonLocation}${field('Superficie mínima', 'surfaceMin', 'number')}${field('Superficie máxima', 'surfaceMax', 'number')}${field('Ancho mínimo', 'width', 'number')}${field('Largo mínimo', 'length', 'number')}${field('Precio mínimo', 'priceMin', 'number')}${field('Precio máximo', 'priceMax', 'number')}${field('Orientación', 'orientation', 'select', ['Norte', 'Sur poniente', 'Oriente'])}${field('Servicios', 'services')}${field('Zonificación', 'zoning')}${field('Rentabilidad mínima (%)', 'profitability', 'number')}${field('Características', 'features', 'text')}`;
        } else if (state.category === 'architect') {
            filterPanel.innerHTML = `${commonLocation}${field('Especialidad', 'specialty')}${field('Experiencia mínima (años)', 'experience', 'number')}${field('Tipo de proyecto', 'projectType', 'select', ['Viviendas', 'Edificios', 'Interiorismo', 'Comercial', 'Sustentable', 'Urbanismo'])}${field('Disponibilidad', 'availability', 'select', ['Disponible', 'En proyectos'])}`;
        } else if (state.category === 'project') {
            filterPanel.innerHTML = `${field('Tipo de proyecto', 'projectType')}${commonLocation}${field('Estilo', 'style')}${field('Superficie mínima', 'surfaceMin', 'number')}${field('Arquitecto', 'architect')}${field('Estado', 'status')}${field('Presupuesto máximo', 'budgetMax', 'number')}`;
        } else {
            filterPanel.innerHTML = `<div class="filter-field full"><label for="filter-location">Filtrar por ubicación</label><input id="filter-location" data-filter="location" type="text" placeholder="Ciudad o región"></div>`;
        }
        filterPanel.querySelectorAll('[data-filter]').forEach((control) => {
            control.value = filterValues[control.dataset.filter] || '';
            control.addEventListener('input', updateResults);
            control.addEventListener('change', updateResults);
        });
    };

    const searchable = (item) => Object.values(item).filter((value) => typeof value !== 'object').join(' ').toLowerCase();
    const matchesText = (item, query) => !query || searchable(item).includes(query);
    const matchesFilters = (item) => {
        const value = (name) => filterValues[name]?.trim().toLowerCase() || '';
        if (value('location') && !item.ubicacion.toLowerCase().includes(value('location'))) return false;
        if (state.category === 'terrain') return (!value('surfaceMin') || item.superficie >= Number(value('surfaceMin'))) && (!value('surfaceMax') || item.superficie <= Number(value('surfaceMax'))) && (!value('width') || item.ancho >= Number(value('width'))) && (!value('length') || item.largo >= Number(value('length'))) && (!value('priceMin') || item.precio >= Number(value('priceMin'))) && (!value('priceMax') || item.precio <= Number(value('priceMax'))) && (!value('orientation') || item.orientacion.toLowerCase() === value('orientation')) && (!value('services') || item.servicios.toLowerCase().includes(value('services'))) && (!value('zoning') || item.zonificacion.toLowerCase().includes(value('zoning'))) && (!value('profitability') || item.rentabilidad >= Number(value('profitability'))) && (!value('features') || item.caracteristicas.includes(value('features')));
        if (state.category === 'architect') return (!value('specialty') || item.especialidad.toLowerCase().includes(value('specialty'))) && (!value('experience') || item.experiencia >= Number(value('experience'))) && (!value('projectType') || item.especialidad.toLowerCase().includes(value('projectType'))) && (!value('availability') || item.disponibilidad.toLowerCase() === value('availability'));
        if (state.category === 'project') return (!value('projectType') || item.tipo.toLowerCase().includes(value('projectType'))) && (!value('style') || item.estilo.toLowerCase().includes(value('style'))) && (!value('surfaceMin') || item.superficie >= Number(value('surfaceMin'))) && (!value('architect') || item.detalle.toLowerCase().includes(value('architect'))) && (!value('status') || item.detalle.toLowerCase().includes(value('status'))) && (!value('budgetMax') || item.presupuesto <= Number(value('budgetMax')));
        return true;
    };

    const emptyState = () => `<div class="empty-results"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i><h3>0 resultados</h3><p>Probá modificar los filtros o realizar otra búsqueda.</p></div>`;
    const resultCard = (item, category) => {
        const destination = category === 'terrain' ? `terreno.html?id=${item.id}` : category === 'architect' ? `arquitecto.html?id=${item.id}` : `proyecto.html?id=${item.id}`;
        const type = category === 'terrain' ? 'Terreno' : category === 'architect' ? 'Arquitecto' : 'Proyecto';
        const highlight = category === 'terrain' ? item.precioTexto : category === 'architect' ? item.especialidad.split(' ').slice(0, 3).join(' ') : item.tipo;
        return `<article class="result-card"><img class="result-image" src="${item.imagen}" alt="${item.nombre}" loading="lazy"><div class="result-content"><span class="result-type">${type}</span><h3>${item.nombre}</h3><p class="result-location"><i class="fa-solid fa-location-dot" aria-hidden="true"></i>${item.ubicacion}</p><p class="result-detail">${item.detalle}</p><div class="result-footer"><span class="result-highlight">${highlight}</span><a class="view-button" href="${destination}">Ver <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></div></div></article>`;
    };

    const updateResults = () => {
        filterPanel.querySelectorAll('[data-filter]').forEach((control) => { filterValues[control.dataset.filter] = control.value; });
        const query = searchInput.value.trim().toLowerCase();
        const sources = state.category === 'all' ? [{ items: terrenos, category: 'terrain' }, { items: arquitectos, category: 'architect' }, { items: proyectos, category: 'project' }] : [{ items: state.category === 'terrain' ? terrenos : state.category === 'architect' ? arquitectos : proyectos, category: state.category }];
        let results = sources.flatMap(({ items, category }) => items.filter((item) => matchesText(item, query) && matchesFilters(item)).map((item) => ({ item, category })));
        if (sortSelect.value !== 'relevance') results.sort((a, b) => { const key = sortSelect.value === 'price-low' || sortSelect.value === 'price-high' ? 'precio' : sortSelect.value === 'surface' ? 'superficie' : 'rentabilidad'; const first = a.item[key] || a.item.presupuesto || 0; const second = b.item[key] || b.item.presupuesto || 0; return sortSelect.value === 'price-low' ? first - second : second - first; });
        resultsCount.textContent = `${results.length} ${results.length === 1 ? 'resultado' : 'resultados'}`;
        resultsList.innerHTML = results.length ? results.map(({ item, category }) => resultCard(item, category)).join('') : emptyState();
    };

    const addSearchSidebarLink = () => {
        const nav = document.querySelector('.sidebar-nav');
        if (!nav || nav.querySelector('[href="buscador.html"]')) return;
        const link = document.createElement('a');
        link.className = 'sidebar-link'; link.href = 'buscador.html'; link.setAttribute('aria-current', 'page');
        link.innerHTML = '<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i><span>Explore / Buscador</span>';
        nav.append(link);
    };

    document.querySelectorAll('[data-category]').forEach((tab) => tab.addEventListener('click', () => {
        state.category = tab.dataset.category;
        document.querySelectorAll('[data-category]').forEach((item) => { item.classList.toggle('is-active', item === tab); item.setAttribute('aria-selected', String(item === tab)); });
        Object.keys(filterValues).forEach((key) => delete filterValues[key]);
        renderFilters(); updateResults();
    }));
    searchForm.addEventListener('submit', (event) => { event.preventDefault(); updateResults(); });
    sortSelect.addEventListener('change', updateResults);
    searchInput.addEventListener('input', updateResults);
    document.querySelector('#clear-filters').addEventListener('click', () => { searchInput.value = ''; sortSelect.value = 'relevance'; Object.keys(filterValues).forEach((key) => delete filterValues[key]); renderFilters(); updateResults(); });

    addSearchSidebarLink(); renderFilters(); updateResults();
})();
