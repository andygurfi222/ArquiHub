(() => {
    window.ArquiHubProfile.mount({
        role: 'arquitecto',
        title: 'PERFIL ARQUITECTO',
        roleLabel: 'Arquitecto',
        demoName: 'Arquitecto/a de ejemplo',
        demoLocation: 'Ciudad de México, MX',
        demoPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=640&h=720&q=85',
        demoProjectPhoto: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&h=560&q=85',
        fields: [
            { name: 'nombre', label: 'Nombre completo', required: true },
            { name: 'ubicacion', label: 'Ubicación', required: true },
            { name: 'formacion', label: 'Formación académica' },
            { name: 'especialidades', label: 'Especialidades' },
            { name: 'experiencia', label: 'Experiencia' },
            { name: 'estilos', label: 'Estilos arquitectónicos' },
            { name: 'descripcion', label: 'Descripción profesional', type: 'textarea', full: true },
            { name: 'habilidades', label: 'Habilidades', type: 'textarea', full: true }
        ],
        facts: [
            { name: 'formacion', label: 'Formación académica' },
            { name: 'especialidades', label: 'Especialidades' },
            { name: 'experiencia', label: 'Experiencia' },
            { name: 'estilos', label: 'Estilos arquitectónicos' },
            { name: 'habilidades', label: 'Habilidades' }
        ],
        portfolio: true
    });
})();
