(() => {
    const storageKeys = {
        dueno: 'arqhub-perfil-dueno',
        arquitecto: 'arqhub-perfil-arquitecto',
        inversor: 'arqhub-perfil-inversor'
    };
    const root = document.querySelector('#profile-root');

    const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);

    const imageData = (file, maxDimension = 900) => new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) {
            reject(new Error('Elegí un archivo de imagen válido.'));
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            reject(new Error('La imagen debe pesar menos de 10 MB.'));
            return;
        }
        const reader = new FileReader();
        reader.onerror = () => reject(new Error('No se pudo leer la imagen seleccionada.'));
        reader.onload = () => {
            const image = new Image();
            image.onerror = () => reject(new Error('No se pudo procesar la imagen seleccionada.'));
            image.onload = () => {
                const ratio = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
                const canvas = document.createElement('canvas');
                canvas.width = Math.max(1, Math.round(image.naturalWidth * ratio));
                canvas.height = Math.max(1, Math.round(image.naturalHeight * ratio));
                canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg', 0.78));
            };
            image.src = reader.result;
        };
        reader.readAsDataURL(file);
    });

    const readLocalJson = (key) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    };

    const mount = (config) => {
        if (!root || root.dataset.profileRole !== config.role) return;
        const storageKey = storageKeys[config.role];
        let saved;
        try {
            saved = readLocalJson(storageKey);
        } catch {
            root.innerHTML = '<p class="profile-error" role="alert">No se pudieron leer los datos guardados de este perfil. Revisá el almacenamiento local del navegador e intentá nuevamente.</p>';
            return;
        }
        const current = { ...(saved || {}), projects: saved?.projects || [] };
        let workingProjects = [];
        let complete = Boolean(current.nombre && current.ubicacion);
        const displayValue = (name) => current[name]?.trim() || '';
        const displayName = () => displayValue('nombre') || config.demoName;
        const displayLocation = () => displayValue('ubicacion') || config.demoLocation;
        const displayFact = (fact) => displayValue(fact.name) || 'A completar';

        const fieldMarkup = (field) => {
            const id = `profile-field-${field.name}`;
            const required = field.required ? ' required' : '';
            const control = field.type === 'textarea'
                ? `<textarea id="${id}" name="${field.name}"${required} rows="3">${escapeHtml(displayValue(field.name))}</textarea>`
                : `<input id="${id}" name="${field.name}" type="text" value="${escapeHtml(displayValue(field.name))}"${required}>`;
            return `<div class="profile-field${field.full ? ' is-full' : ''}"><label for="${id}">${escapeHtml(field.label)}${field.required ? ' *' : ''}</label>${control}</div>`;
        };

        const projectMarkup = (project, index) => `
            <article class="profile-project-editor" data-project-index="${index}">
                <div class="profile-project-editor-heading"><strong>Proyecto ${index + 1}</strong><button type="button" data-remove-project="${index}" aria-label="Quitar proyecto ${index + 1}">Quitar</button></div>
                <div class="profile-field-grid">
                    <div class="profile-field"><label>Nombre del proyecto</label><input type="text" data-project-field="nombre" value="${escapeHtml(project.nombre)}"></div>
                    <div class="profile-field"><label>Tipo de proyecto</label><input type="text" data-project-field="tipo" value="${escapeHtml(project.tipo)}"></div>
                    <div class="profile-field"><label>Ubicación</label><input type="text" data-project-field="ubicacion" value="${escapeHtml(project.ubicacion)}"></div>
                    <div class="profile-field"><label>ID del terreno asociado (opcional)</label><input type="text" data-project-field="terrenoId" value="${escapeHtml(project.terrenoId)}"></div>
                </div>
                <label class="profile-project-upload">Imagen del proyecto <input type="file" accept="image/*" data-project-image="${index}"><img data-project-preview="${index}" src="${escapeHtml(project.imagen || '')}" alt="Vista previa del proyecto" ${project.imagen ? '' : 'hidden'}></label>
            </article>`;

        const render = () => {
            const factsMarkup = config.facts.map((fact) => `<div class="profile-fact"><small>${escapeHtml(fact.label)}</small><strong>${escapeHtml(displayFact(fact))}</strong></div>`).join('');
            root.innerHTML = `
                <a class="profile-crumb" href="perfil.html"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Todos los perfiles</a>
                <div class="profile-page-heading"><span class="section-label">${escapeHtml(config.roleLabel)}</span><h1 class="profile-page-title">${escapeHtml(config.title)}</h1></div>
                <section class="profile-hero" aria-label="Identidad del perfil">
                    <div class="profile-avatar-wrap">
                        <img class="profile-avatar" data-profile-avatar src="${escapeHtml(current.foto || config.demoPhoto)}" alt="Fotografía de ${escapeHtml(displayName())}">
                        <label class="profile-avatar-label" for="profile-photo" aria-label="Cambiar fotografía"><i class="fa-solid fa-camera" aria-hidden="true"></i></label>
                        <input class="profile-avatar-input" id="profile-photo" type="file" accept="image/*">
                    </div>
                    <div class="profile-identity">
                        <h2 data-profile-name>${escapeHtml(displayName())}</h2>
                        <p><i class="fa-solid fa-location-dot" aria-hidden="true"></i><span data-profile-location>${escapeHtml(displayLocation())}</span></p>
                        <p class="profile-role-description">${escapeHtml(config.roleLabel)} · ${complete ? 'Perfil guardado en este dispositivo' : 'Perfil de demostración'}</p>
                        <div class="profile-actions-row"><button class="profile-primary-button" type="button" data-toggle-editor>${complete ? 'EDITAR PERFIL' : 'CREAR PERFIL'}</button></div>
                    </div>
                </section>
                <section class="profile-panel" aria-labelledby="profile-characteristics-title">
                    <div class="profile-panel-heading"><h2 id="profile-characteristics-title">Características del usuario</h2><span>${complete ? 'Información del perfil' : 'Completá tu información'}</span></div>
                    <p class="profile-description-text">${escapeHtml(displayValue('descripcion') || (complete ? 'Podés agregar una descripción desde Editar perfil.' : 'Completá tu perfil para compartir tu información con la comunidad.'))}</p>
                    <div class="profile-facts">${factsMarkup}</div>
                </section>
                ${config.portfolio ? `<section class="profile-panel" aria-labelledby="portfolio-title"><div class="profile-panel-heading"><h2 id="portfolio-title">Portfolio</h2><span data-portfolio-count>0 proyectos</span></div><div class="portfolio-grid" data-portfolio-list></div></section>` : ''}
                <form class="profile-form" data-profile-form hidden>
                    <div class="profile-form-heading"><h2>${complete ? 'Editar información' : 'Crear tu perfil'}</h2><p>Los datos se guardan localmente en este navegador. No se envían a una base de datos ni se comparten con otras cuentas.</p></div>
                    <div class="profile-field-grid">${config.fields.map(fieldMarkup).join('')}</div>
                    ${config.portfolio ? `<div class="profile-form-heading"><h2>Portfolio</h2><p>Agregá proyectos propios o propuestas vinculadas a un terreno publicado.</p></div><div class="profile-form-projects" data-project-editor-list></div><button class="profile-secondary-button" type="button" data-add-project><i class="fa-solid fa-plus" aria-hidden="true"></i> Agregar proyecto</button>` : ''}
                    <p class="profile-message" data-profile-message role="status" aria-live="polite"></p>
                    <div class="profile-form-actions"><button class="profile-primary-button" type="submit">GUARDAR PERFIL</button><button class="profile-secondary-button" type="button" data-cancel-editor>Cancelar</button></div>
                </form>
                <p class="profile-message" data-avatar-message role="status" aria-live="polite"></p>
            `;
            renderPortfolio();
            bindEvents();
        };

        const getProposalProjects = () => {
            const proposals = readLocalJson('arqhub-proyectos') || [];
            const architectId = Number(localStorage.getItem('arqhub-arquitecto-id')) || 1;
            return proposals.filter((project) => Number(project.arquitectoId) === architectId).map((project) => ({
                ...project,
                id: project.id,
                nombre: project.nombre,
                tipo: project.tipo,
                ubicacion: project.ubicacion || '',
                imagen: project.imagenes?.find((image) => image.datos)?.datos || '',
                terrenoId: project.terrenoId
            }));
        };

        const renderPortfolio = () => {
            if (!config.portfolio) return;
            const list = root.querySelector('[data-portfolio-list]');
            const count = root.querySelector('[data-portfolio-count]');
            let proposalProjects = [];
            let proposalError = false;
            try {
                proposalProjects = getProposalProjects();
            } catch {
                proposalError = true;
            }
            const projects = [...current.projects, ...proposalProjects];
            count.textContent = `${projects.length} ${projects.length === 1 ? 'proyecto' : 'proyectos'}`;
            if (proposalError) {
                list.innerHTML = '<p class="profile-error" role="alert">No se pudieron leer las propuestas guardadas en este navegador.</p>';
                return;
            }
            list.innerHTML = projects.length ? projects.map((project) => `
                <article class="portfolio-card">
                    <img src="${escapeHtml(project.imagen || config.demoProjectPhoto || config.demoPhoto)}" alt="Imagen del proyecto ${escapeHtml(project.nombre || 'arquitectónico')}" loading="lazy">
                    <div class="portfolio-card-body"><h3>${escapeHtml(project.nombre || 'Proyecto sin título')}</h3><p>${escapeHtml([project.tipo, project.ubicacion].filter(Boolean).join(' · ') || 'Portfolio profesional')}</p>
                        <div class="portfolio-card-footer"><span>${project.terrenoId ? 'Propuesta vinculada a terreno' : 'Portfolio'}</span><a class="profile-secondary-button" href="proyecto.html?id=${encodeURIComponent(project.id)}">Ver <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></div>
                    </div>
                </article>`).join('') : '<p class="profile-empty">Todavía no hay proyectos en el portfolio. Podés agregarlos al crear o editar tu perfil.</p>';
        };

        const setMessage = (message, text, kind = '') => {
            message.textContent = text;
            message.classList.toggle('is-error', kind === 'error');
            message.classList.toggle('is-success', kind === 'success');
        };

        const syncProjectInputs = () => {
            root.querySelectorAll('[data-project-index]').forEach((card) => {
                const index = Number(card.dataset.projectIndex);
                card.querySelectorAll('[data-project-field]').forEach((input) => {
                    workingProjects[index][input.dataset.projectField] = input.value.trim();
                });
            });
        };

        const renderProjectEditors = () => {
            const list = root.querySelector('[data-project-editor-list]');
            if (list) list.innerHTML = workingProjects.map(projectMarkup).join('');
        };

        const openEditor = () => {
            workingProjects = current.projects.map((project) => ({ ...project }));
            const form = root.querySelector('[data-profile-form]');
            form.hidden = false;
            root.querySelector('[data-toggle-editor]').hidden = true;
            renderProjectEditors();
            form.querySelector('input[name="nombre"]').focus();
        };

        const closeEditor = () => {
            root.querySelector('[data-profile-form]').hidden = true;
            root.querySelector('[data-toggle-editor]').hidden = false;
            setMessage(root.querySelector('[data-profile-message]'), '');
        };

        const bindEvents = () => {
            const form = root.querySelector('[data-profile-form]');
            root.querySelector('[data-toggle-editor]').addEventListener('click', openEditor);
            root.querySelector('[data-cancel-editor]').addEventListener('click', closeEditor);
            root.querySelector('[data-avatar-message]').textContent = '';
            root.querySelector('#profile-photo').addEventListener('change', async (event) => {
                const [file] = event.currentTarget.files;
                if (!file) return;
                const message = root.querySelector('[data-avatar-message]');
                try {
                    current.foto = await imageData(file, 512);
                    localStorage.setItem(storageKey, JSON.stringify(current));
                    const avatar = root.querySelector('[data-profile-avatar]');
                    avatar.src = current.foto;
                    avatar.alt = `Fotografía de ${displayName()}`;
                    setMessage(message, 'Fotografía guardada en este dispositivo.', 'success');
                } catch (error) {
                    setMessage(message, error.message || 'No se pudo guardar la fotografía.', 'error');
                }
            });
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                if (!form.reportValidity()) return;
                const values = Object.fromEntries(new FormData(form).entries());
                syncProjectInputs();
                const next = { ...current, ...values, projects: workingProjects.filter((project) => project.nombre.trim()) };
                try {
                    localStorage.setItem(storageKey, JSON.stringify(next));
                    Object.assign(current, next);
                    complete = Boolean(current.nombre && current.ubicacion);
                    render();
                    root.querySelector('[data-toggle-editor]').focus();
                } catch {
                    setMessage(root.querySelector('[data-profile-message]'), 'No se pudo guardar el perfil. El almacenamiento local puede estar lleno; probá con imágenes más livianas.', 'error');
                }
            });
            if (config.portfolio) {
                root.querySelector('[data-add-project]').addEventListener('click', () => {
                    syncProjectInputs();
                    workingProjects.push({ id: `portfolio-${Date.now()}-${workingProjects.length}`, nombre: '', tipo: '', ubicacion: '', terrenoId: '', imagen: '' });
                    renderProjectEditors();
                });
                root.querySelector('[data-project-editor-list]').addEventListener('click', (event) => {
                    const button = event.target.closest('[data-remove-project]');
                    if (!button) return;
                    syncProjectInputs();
                    workingProjects.splice(Number(button.dataset.removeProject), 1);
                    renderProjectEditors();
                });
                root.querySelector('[data-project-editor-list]').addEventListener('change', async (event) => {
                    const input = event.target.closest('[data-project-image]');
                    if (!input || !input.files[0]) return;
                    const index = Number(input.dataset.projectImage);
                    try {
                        workingProjects[index].imagen = await imageData(input.files[0]);
                        syncProjectInputs();
                        renderProjectEditors();
                    } catch (error) {
                        setMessage(root.querySelector('[data-profile-message]'), error.message || 'No se pudo cargar la imagen.', 'error');
                    }
                });
            }
        };

        render();
    };

    window.ArquiHubProfile = { mount };
})();
