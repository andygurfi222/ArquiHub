(() => {
    const storageKey = 'arqhub-terrenos';
    const form = document.querySelector('#terrain-form');
    const mediaGrid = document.querySelector('#media-grid');
    const message = document.querySelector('#form-message');
    const mediaFiles = { foto: [], video: [] };
    const sidebarItems = [{ label: 'Home', href: 'home.html', icon: 'fa-house' }, { label: 'Architects', href: 'arquitecto.html', icon: 'fa-compass-drafting' }, { label: 'Projects', href: 'proyecto.html', icon: 'fa-folder-open' }, { label: 'Explore', href: 'buscador.html', icon: 'fa-magnifying-glass' }, { label: 'Publish', href: 'publicar.html', icon: 'fa-plus' }, { label: 'Requests', href: 'solicitudes.html', icon: 'fa-arrow-right-arrow-left' }, { label: 'Account', href: 'perfil.html', icon: 'fa-user' }];
    const sidebarNav = document.querySelector('.sidebar-nav');
    if (sidebarNav) sidebarNav.innerHTML = sidebarItems.map(({ label, href, icon }) => `<a class="sidebar-link" href="${href}"><i class="fa-solid ${icon}" aria-hidden="true"></i><span>${label}</span></a>`).join('');

    const createMediaSlot = (type, index) => {
        const slot = document.createElement('div');
        slot.className = 'media-slot';
        slot.dataset.mediaType = type;
        slot.innerHTML = `<input type="file" accept="${type === 'foto' ? 'image/*' : 'video/*'}" aria-label="Seleccionar ${type} ${index}"><div class="media-placeholder"><i class="fa-solid ${type === 'foto' ? 'fa-image' : 'fa-video'}" aria-hidden="true"></i><span>${type === 'foto' ? 'Foto' : 'Video'} ${index}</span></div>`;
        const input = slot.querySelector('input');
        input.addEventListener('change', () => {
            const file = input.files[0];
            if (!file) return;
            const fileData = { slot, file };
            const fileIndex = mediaFiles[type].findIndex((item) => item.slot === slot);
            if (fileIndex >= 0) mediaFiles[type][fileIndex] = fileData; else mediaFiles[type].push(fileData);
            slot.querySelector('.media-placeholder').innerHTML = `<${type === 'foto' ? 'img' : 'video'} class="media-preview" src="${URL.createObjectURL(file)}" ${type === 'video' ? 'controls' : ''} alt="Vista previa de ${file.name}"></${type === 'foto' ? 'img' : 'video'}><span class="media-name">${file.name}</span>`;
        });
        mediaGrid.append(slot);
    };
    const addMedia = (type) => createMediaSlot(type, mediaGrid.querySelectorAll(`[data-media-type="${type}"]`).length + 1);
    document.querySelectorAll('[data-add-media]').forEach((button) => button.addEventListener('click', () => addMedia(button.dataset.addMedia)));
    ['foto', 'video'].forEach((type) => { for (let index = 1; index <= 2; index += 1) createMediaSlot(type, index); });

    const readFile = (file) => new Promise((resolve) => { const reader = new FileReader(); reader.onload = () => resolve({ nombre: file.name, tipo: file.type, datos: reader.result }); reader.onerror = () => resolve({ nombre: file.name, tipo: file.type }); reader.readAsDataURL(file); });
    const values = (data) => ({ id: Date.now(), nombre: data.get('nombre').trim(), ubicacion: data.get('ubicacion').trim(), superficie: data.get('superficie').trim(), ancho: data.get('ancho').trim(), largo: data.get('largo').trim(), orientacion: data.get('orientacion').trim(), tipo: data.get('tipo'), normativas: { alturaMaxima: data.get('alturaMaxima').trim(), pisosPermitidos: data.get('pisosPermitidos').trim(), fos: data.get('fos').trim(), fot: data.get('fot').trim(), retiros: data.get('retiros').trim(), zonificacion: data.get('zonificacion').trim(), otrasRestricciones: data.get('restricciones').trim() }, caracteristicas: { pendiente: data.get('pendiente').trim(), tipoSuelo: data.get('tipoSuelo').trim(), orientacion: data.get('orientacion').trim(), servicios: data.get('servicios').trim(), vegetacion: data.get('vegetacion').trim(), accesos: data.get('accesos').trim(), estadoActual: data.get('estadoActual').trim(), otras: data.get('otrasCaracteristicas').trim() }, presupuesto: data.get('presupuesto').trim(), moneda: data.get('moneda'), presupuestoAproximado: data.get('presupuestoAproximado').trim(), observacionesPresupuesto: data.get('observacionesPresupuesto').trim(), condiciones: data.get('condiciones').trim(), fotos: [], videos: [] });
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!form.reportValidity()) { message.textContent = 'Completá los campos marcados para poder publicar tu terreno.'; message.classList.remove('is-success'); return; }
        const terrain = values(new FormData(form));
        terrain.fotos = await Promise.all(mediaFiles.foto.map(({ file }) => readFile(file)));
        terrain.videos = await Promise.all(mediaFiles.video.map(({ file }) => readFile(file)));
        const terrains = JSON.parse(localStorage.getItem(storageKey) || '[]');
        terrains.push(terrain);
        localStorage.setItem(storageKey, JSON.stringify(terrains));
        message.textContent = 'Tu terreno se publicó correctamente. Te llevamos a Home.';
        message.classList.add('is-success');
        setTimeout(() => { window.location.href = 'home.html'; }, 900);
    });
})();