(() => {
    const sidebarItems = [
        { label: 'Home', href: 'home.html', icon: 'fa-house' },
        { label: 'Architects', href: 'arquitecto.html', icon: 'fa-compass-drafting' },
        { label: 'Projects', href: 'proyecto.html', icon: 'fa-folder-open' },
        { label: 'Explore', href: 'buscador.html', icon: 'fa-magnifying-glass' },
        { label: 'Publish', href: 'publicar.html', icon: 'fa-plus' },
        { label: 'Requests', href: 'solicitudes.html', icon: 'fa-arrow-right-arrow-left' },
        { label: 'Account', href: 'perfil.html', icon: 'fa-user' }
    ];

    const sidebarNav = document.querySelector('.sidebar-nav');
    if (!sidebarNav) return;

    sidebarNav.innerHTML = sidebarItems.map(({ label, href, icon }) => `
        <a class="sidebar-link" href="${href}">
            <i class="fa-solid ${icon}" aria-hidden="true"></i>
            <span>${label}</span>
        </a>
    `).join('');
})();
