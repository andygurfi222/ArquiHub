(() => {
    const terrainsKey = 'arqhub-terrenos';
    const selectedKeys = ['arqhub-terreno-seleccionado', 'arqhub-selected-terreno'];
    const projectsKey = 'arqhub-proyectos';
    const form = document.querySelector('#project-form');
    const message = document.querySelector('#form-message');
    const imageGrid = document.querySelector('#image-grid');
    const imageFiles = [];
    const sidebarItems = [{ label: 'Home', href: 'home.html', icon: 'fa-house' }, { label: 'Architects', href: 'arquitecto.html', icon: 'fa-compass-drafting' }, { label: 'Projects', href: 'proyecto.html', icon: 'fa-folder-open' }, { label: 'Explore', href: 'buscador.html', icon: 'fa-magnifying-glass' }, { label: 'Publish', href: 'publicar.html', icon: 'fa-plus' }, { label: 'Requests', href: 'solicitudes.html', icon: 'fa-arrow-right-arrow-left' }, { label: 'Account', href: 'perfil.html', icon: 'fa-user' }];
    const sidebarNav = document.querySelector('.sidebar-nav');
    if (sidebarNav) sidebarNav.innerHTML = sidebarItems.map(({ label, href, icon }) => `<a class="sidebar-link" href="${href}"><i class="fa-solid ${icon}" aria-hidden="true"></i><span>${label}</span></a>`).join('');

    const fallbackTerrain = { id: 1, nombre: 'Terreno Palermo 01', ubicacion: 'Buenos Aires', superficie: '300 m²', ancho: '10 m', largo: '30 m', orientacion: 'Norte', tipo: 'Residencial urbano', servicios: 'Agua, luz y cloacas', zonificacion: 'Residencial', normativas: { fos: '0,60', fot: '1,20', alturaMaxima: '9 m', pisosPermitidos: '2 pisos' }, caracteristicas: { pendiente: 'Plano' }, condiciones: 'Vivienda familiar\nCochera\nMáximo 2 pisos\nMantener árbol existente', presupuesto: '$XXX' };
    const params = new URLSearchParams(window.location.search);
    const queryTerrainId = params.get('terrenoId') || params.get('id');
    const parseStorage = (key) => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
    const savedTerrains = parseStorage(terrainsKey) || [];
    const selectedStorage = selectedKeys.map(parseStorage).find(Boolean);
    const selectedId = queryTerrainId || (typeof selectedStorage === 'object' ? selectedStorage.id || selectedStorage.terrenoId : selectedStorage);
    const terrain = savedTerrains.find((item) => String(item.id) === String(selectedId)) || (selectedStorage?.nombre ? selectedStorage : fallbackTerrain);

    const text = (value, fallback = 'No informado') => value || fallback;
    const renderTerrain = () => {
        document.querySelector('#selected-land-title').textContent = text(terrain.nombre, 'Terreno seleccionado');
        document.querySelector('#land-location').textContent = text(terrain.ubicacion);
        document.querySelector('#land-summary').innerHTML = `<span><strong>${text(terrain.ancho, '--')} x ${text(terrain.largo, '--')}</strong>Dimensiones</span><span><strong>${text(terrain.superficie, '--')}</strong>Superficie</span><span><strong>${text(terrain.orientacion, '--')}</strong>Orientación</span>`;
        const rules = terrain.normativas || {};
        const features = terrain.caracteristicas || {};
        const details = [['Ubicación', terrain.ubicacion], ['Superficie', terrain.superficie], ['Ancho', terrain.ancho], ['Largo', terrain.largo], ['Orientación', terrain.orientacion], ['FOS', rules.fos], ['FOT', rules.fot], ['Altura máxima', rules.alturaMaxima], ['Pisos permitidos', rules.pisosPermitidos], ['Servicios', terrain.servicios || features.servicios], ['Características', Object.values(features).filter(Boolean).join(', ')], ['Presupuesto', terrain.presupuesto]];
        document.querySelector('#land-details').innerHTML = details.map(([label, value]) => `<div class="detail-item"><span>${label}</span><strong>${text(value)}</strong></div>`).join('');
        const conditions = String(terrain.condiciones || 'Condiciones a definir con el propietario').split(/\n|\r|•|✓|-/).map((item) => item.trim()).filter(Boolean);
        document.querySelector('#condition-list').innerHTML = conditions.map((condition) => `<div class="condition-item"><i class="fa-solid fa-check" aria-hidden="true"></i><span>${condition}</span></div>`).join('');
    };
    renderTerrain();

    document.querySelector('.land-details-toggle').addEventListener('click', (event) => { const button = event.currentTarget; const details = document.querySelector('#land-details'); const expanded = button.getAttribute('aria-expanded') === 'true'; button.setAttribute('aria-expanded', String(!expanded)); details.hidden = expanded; });
    const createImageSlot = (index) => {
        const slot = document.createElement('div'); slot.className = 'image-slot';
        slot.innerHTML = `<input type="file" accept="image/*" aria-label="Seleccionar imagen ${index}"><div class="image-placeholder"><i class="fa-solid fa-image" aria-hidden="true"></i><span>${index === 1 ? 'Render principal' : 'Imagen ' + index}</span></div>`;
        const input = slot.querySelector('input'); input.addEventListener('change', () => { const file = input.files[0]; if (!file) return; const current = imageFiles.findIndex((item) => item.slot === slot); const data = { slot, file }; if (current >= 0) imageFiles[current] = data; else imageFiles.push(data); slot.querySelector('.image-placeholder').innerHTML = `<img class="image-preview" src="${URL.createObjectURL(file)}" alt="Vista previa de ${file.name}"><span class="image-name">${file.name}</span>`; }); imageGrid.append(slot);
    };
    [1, 2].forEach(createImageSlot);
    document.querySelector('#add-image').addEventListener('click', () => createImageSlot(imageGrid.children.length + 1));
    const readFile = (file) => new Promise((resolve) => { const reader = new FileReader(); reader.onload = () => resolve({ nombre: file.name, tipo: file.type, datos: reader.result }); reader.onerror = () => resolve({ nombre: file.name, tipo: file.type }); reader.readAsDataURL(file); });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!terrain || !terrain.id) { message.textContent = 'Seleccioná un terreno antes de crear la propuesta.'; return; }
        if (!form.reportValidity()) { message.textContent = 'Completá los campos principales para poder publicar el proyecto.'; message.classList.remove('is-success'); return; }
        const data = new FormData(form);
        const project = { id: Date.now(), terrenoId: terrain.id, arquitectoId: Number(localStorage.getItem('arqhub-arquitecto-id')) || 1, nombre: data.get('nombre').trim(), descripcion: data.get('descripcion').trim(), tipo: data.get('tipo'), estilo: data.get('estilo').trim(), superficie: data.get('superficie').trim(), pisos: data.get('pisos'), habitaciones: data.get('habitaciones'), presupuesto: data.get('presupuesto').trim(), materiales: data.get('materiales').trim(), concepto: data.get('concepto').trim(), imagenes: await Promise.all(imageFiles.map(({ file }) => readFile(file))) };
        const projects = parseStorage(projectsKey) || []; projects.push(project); localStorage.setItem(projectsKey, JSON.stringify(projects)); localStorage.setItem('arqhub-ultimo-proyecto', JSON.stringify(project)); message.textContent = 'Tu proyecto se publicó correctamente. Te llevamos a Home.'; message.classList.add('is-success'); setTimeout(() => { window.location.href = 'home.html'; }, 900);
    });
})();