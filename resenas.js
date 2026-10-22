(() => {
    const reviews = [
        {
            author: 'Usuario de demostración',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&h=720&q=85',
            rating: 5,
            text: 'Excelente propuesta arquitectónica. El proyecto aprovechó muy bien las dimensiones del terreno y respetó las condiciones solicitadas.',
            date: 'Fecha de demostración',
            architect: 'Sofía Méndez',
            architectUrl: 'arquitecto.html?id=1',
            project: 'Casa Ladera',
            projectUrl: 'proyecto.html?id=1'
        }
    ];

    const galleryItems = [
        { name: 'Casa Ladera', type: 'Casa · Valle de Bravo', architect: 'Sofía Méndez', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&h=850&q=85', projectUrl: 'proyecto.html?id=1' },
        { name: 'Patio Norte', type: 'Proyecto de uso mixto · Querétaro', architect: 'Camila Torres', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1100&h=850&q=85', projectUrl: 'proyecto.html?id=3' },
        { name: 'Refugio del Bosque', type: 'Casa · Bariloche', architect: 'Mateo Ríos', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1100&h=850&q=85', projectUrl: 'proyecto.html?id=2' },
        { name: 'Casa Luz', type: 'Proyecto residencial · Mendoza', architect: 'Camila Torres', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1100&h=850&q=85', projectUrl: 'proyecto.html?id=3' },
        { name: 'Casa del Jardín', type: 'Arquitectura residencial · Rosario', architect: 'Diego Vidal', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&h=850&q=85', projectUrl: 'proyecto.html?id=1' },
        { name: 'Casa Horizonte', type: 'Casa · Mar del Plata', architect: 'Lucía Acosta', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1100&h=850&q=85', projectUrl: 'proyecto.html?id=2' },
        { name: 'Terreno La Encina', type: 'Terreno · Mérida', architect: '', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1100&h=850&q=85', projectUrl: '' },
        { name: 'Terreno de bosque', type: 'Terreno · paisaje natural', architect: '', image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1100&h=850&q=85', projectUrl: '' },
        { name: 'Obra en construcción', type: 'Construcción · fotografía de referencia', architect: '', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1100&h=850&q=85', projectUrl: '' }
    ];

    const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
    const reviewList = document.querySelector('#review-list');
    const gallery = document.querySelector('#reviews-gallery');
    const dialog = document.querySelector('#gallery-dialog');
    const dialogImage = document.querySelector('#gallery-dialog-image');
    const dialogTitle = document.querySelector('#gallery-dialog-title');
    const dialogMeta = document.querySelector('#gallery-dialog-meta');
    const projectLink = document.querySelector('#gallery-project-link');

    reviewList.innerHTML = reviews.map((review) => `
        <article>
            <div class="review-card-top">
                <div class="review-author"><img src="${escapeHtml(review.avatar)}" alt="Fotografía de demostración de ${escapeHtml(review.author)}" loading="lazy"><div><h2>${escapeHtml(review.author)}</h2><p>Opinión de demostración · No es un usuario real</p></div></div>
                <div class="review-rating" aria-label="Valoración de ${review.rating} sobre 5"><span class="review-stars" aria-hidden="true">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span><strong>${review.rating}.0 / 5</strong></div>
            </div>
            <div class="review-content"><span class="review-quote-mark" aria-hidden="true">“</span><blockquote>${escapeHtml(review.text)}</blockquote>
                <div class="review-context"><a href="${escapeHtml(review.architectUrl)}"><i class="fa-solid fa-compass-drafting" aria-hidden="true"></i>Arquitecta: ${escapeHtml(review.architect)}</a><a href="${escapeHtml(review.projectUrl)}"><i class="fa-regular fa-building" aria-hidden="true"></i>Proyecto: ${escapeHtml(review.project)}</a></div>
                <p class="review-date"><i class="fa-regular fa-calendar" aria-hidden="true"></i> ${escapeHtml(review.date)}</p>
            </div>
        </article>`).join('');

    gallery.innerHTML = galleryItems.map((item, index) => `
        <button class="gallery-card" type="button" data-gallery-index="${index}" aria-label="Ampliar ${escapeHtml(item.name)}">
            <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.type)}" loading="lazy">
            <span class="gallery-card-caption"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.type)}</span></span>
        </button>`).join('');

    const tabs = [...document.querySelectorAll('[data-view]')];
    const setView = (view) => {
        tabs.forEach((tab) => {
            const selected = tab.dataset.view === view;
            tab.classList.toggle('is-active', selected);
            tab.setAttribute('aria-selected', String(selected));
            tab.tabIndex = selected ? 0 : -1;
        });
        document.querySelectorAll('[data-panel]').forEach((panel) => {
            panel.hidden = panel.dataset.panel !== view;
        });
    };

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => setView(tab.dataset.view));
        tab.addEventListener('keydown', (event) => {
            if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
            event.preventDefault();
            const nextIndex = (index + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
            tabs[nextIndex].focus();
            setView(tabs[nextIndex].dataset.view);
        });
    });

    gallery.addEventListener('click', (event) => {
        const card = event.target.closest('[data-gallery-index]');
        if (!card) return;
        const item = galleryItems[Number(card.dataset.galleryIndex)];
        if (!item) return;
        dialogImage.src = item.image;
        dialogImage.alt = `${item.name} — ${item.type}`;
        dialogTitle.textContent = item.name;
        dialogMeta.textContent = [item.type, item.architect].filter(Boolean).join(' · ');
        projectLink.hidden = !item.projectUrl;
        if (item.projectUrl) projectLink.href = item.projectUrl;
        dialog.showModal();
        dialog.querySelector('[data-close-dialog]').focus();
    });

    dialog.querySelector('[data-close-dialog]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) dialog.close();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && dialog.open) dialog.close();
    });
})();
