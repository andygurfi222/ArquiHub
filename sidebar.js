(() => {
    const inHtmlFolder = window.location.pathname.includes('/html/');
    const pagePath = (rootPage, htmlPage = rootPage) => inHtmlFolder ? htmlPage : rootPage;
    const menuItems = [
        { label: 'Architects', href: pagePath('arquitecto.html'), icon: 'fa-compass-drafting' },
        { label: 'Projects', href: pagePath('explorar-proyectos.html'), icon: 'fa-folder-open' },
        { label: 'Explore', href: pagePath('buscador.html'), icon: 'fa-magnifying-glass' },
        { label: 'Reviews', href: pagePath('resenas.html'), icon: 'fa-star' },
        { label: 'Publish', href: pagePath('publicar.html'), icon: 'fa-plus' },
        { label: 'Requests', href: pagePath('notificaciones.html'), icon: 'fa-arrow-right-arrow-left' },
        { label: 'Account', href: pagePath('perfil.html'), icon: 'fa-user' },
        { label: 'Home', href: pagePath('html/home.html', 'home.html'), icon: 'fa-house' }
    ];

    const template = document.createElement('template');
    template.innerHTML = `
        <div class="sidebar-shell">
            <div class="sidebar-overlay" data-sidebar-close></div>
            <aside class="sidebar" id="arqhub-sidebar" aria-label="Menú principal" aria-hidden="true">
                <header class="sidebar-header">
                    <a class="sidebar-brand" href="home.html">
                        <span class="sidebar-brand-mark" aria-hidden="true"><i class="fa-solid fa-a"></i></span>
                        <span>ARQUIHUB</span>
                    </a>
                    <button class="sidebar-close" type="button" data-sidebar-close aria-label="Cerrar menú">
                        <i class="fa-solid fa-xmark" aria-hidden="true"></i>
                    </button>
                </header>
                <nav class="sidebar-nav" aria-label="Secciones de ArquiHub"></nav>
                <footer class="sidebar-footer">Conecta. Diseña. Construye.</footer>
            </aside>
        </div>
    `;

    const shell = template.content.firstElementChild;
    const nav = shell.querySelector('.sidebar-nav');
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';

    menuItems.forEach(({ label, href, icon }) => {
        const link = document.createElement('a');
        link.className = 'sidebar-link';
        link.href = href;
        link.innerHTML = `<i class="fa-solid ${icon}" aria-hidden="true"></i><span>${label}</span>`;
        if (href === currentPage) link.setAttribute('aria-current', 'page');
        nav.append(link);
    });

    document.body.prepend(shell);

    const sidebar = shell.querySelector('.sidebar');
    const closeButton = shell.querySelector('.sidebar-close');
    const menuButton = document.querySelector('[data-sidebar-toggle]');
    let lastFocusedElement;

    if (!menuButton) return;

    const setOpen = (isOpen) => {
        shell.classList.toggle('is-open', isOpen);
        document.body.classList.toggle('sidebar-is-open', isOpen);
        sidebar.setAttribute('aria-hidden', String(!isOpen));
        menuButton.setAttribute('aria-expanded', String(isOpen));
        if (isOpen) {
            lastFocusedElement = document.activeElement;
            closeButton.focus();
        } else {
            lastFocusedElement?.focus();
        }
    };

    menuButton.addEventListener('click', () => setOpen(true));
    shell.querySelectorAll('[data-sidebar-close]').forEach((element) => {
        element.addEventListener('click', () => setOpen(false));
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && shell.classList.contains('is-open')) setOpen(false);
    });
})();
