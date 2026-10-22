(() => {
    window.ArquiHubProfile.mount({
        role: 'inversor',
        title: 'PERFIL INVERSOR',
        roleLabel: 'Inversor',
        demoName: 'Inversor/a de ejemplo',
        demoLocation: 'Buenos Aires, Argentina',
        demoPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=640&h=720&q=85',
        fields: [
            { name: 'nombre', label: 'Nombre completo', required: true },
            { name: 'ubicacion', label: 'Ubicación', required: true },
            { name: 'descripcion', label: 'Descripción', type: 'textarea', full: true },
            { name: 'tipoProyectos', label: 'Tipo de proyectos de interés', type: 'textarea', full: true },
            { name: 'presupuesto', label: 'Presupuesto aproximado (opcional)' },
            { name: 'objetivos', label: 'Objetivos de inversión', type: 'textarea', full: true },
            { name: 'preferencias', label: 'Preferencias', type: 'textarea', full: true },
            { name: 'informacionAdicional', label: 'Información adicional', type: 'textarea', full: true }
        ],
        facts: [
            { name: 'tipoProyectos', label: 'Proyectos de interés' },
            { name: 'presupuesto', label: 'Presupuesto aproximado' },
            { name: 'objetivos', label: 'Objetivos de inversión' },
            { name: 'preferencias', label: 'Preferencias' },
            { name: 'informacionAdicional', label: 'Información adicional' }
        ]
    });
})();
