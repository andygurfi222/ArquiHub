(() => {
    window.ArquiHubProfile.mount({
        role: 'dueno',
        title: 'PERFIL DUEÑO DE TERRENO',
        roleLabel: 'Dueño de terreno',
        demoName: 'Dueño de terreno',
        demoLocation: 'Buenos Aires, Argentina',
        demoPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&h=720&q=85',
        fields: [
            { name: 'nombre', label: 'Nombre completo', required: true },
            { name: 'ubicacion', label: 'Ubicación', required: true },
            { name: 'descripcion', label: 'Descripción personal', type: 'textarea', full: true },
            { name: 'tipoTerreno', label: 'Tipo de terreno que posee' },
            { name: 'intereses', label: 'Intereses y objetivos', type: 'textarea', full: true },
            { name: 'informacionAdicional', label: 'Información adicional', type: 'textarea', full: true }
        ],
        facts: [
            { name: 'tipoTerreno', label: 'Tipo de terreno' },
            { name: 'intereses', label: 'Intereses y objetivos' },
            { name: 'informacionAdicional', label: 'Información adicional' }
        ]
    });
})();
