
    function toggleTheme() {
        const html = document.documentElement;
        const themeIcon = document.getElementById('theme-icon');
        const themeTooltip = document.getElementById('theme-tooltip');
        
        // Alternar tema
        if (html.getAttribute('data-theme') === 'dark') {
            html.setAttribute('data-theme', 'light'); // Define tema claro
            themeIcon.classList.replace('ri-sun-line', 'ri-moon-line'); // Ícone de lua
            themeTooltip.textContent = 'Ativar modo escuro'; // Texto da tooltip
        } else {
            html.setAttribute('data-theme', 'dark'); // Define tema escuro
            themeIcon.classList.replace('ri-moon-line', 'ri-sun-line'); // Ícone de sol
            themeTooltip.textContent = 'Desativar modo escuro'; // Texto da tooltip
        }
    }

