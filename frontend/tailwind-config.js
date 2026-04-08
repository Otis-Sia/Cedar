tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                cedar: {
                    forest: '#1B3022',
                    'forest-dark': '#122117',
                    alabaster: '#F9F7F2',
                    bronze: '#AA8C55',
                    'bronze-light': '#C5AC81',
                    midnight: '#121415',
                    slate: '#4A5568',
                    glass: 'rgba(255, 255, 255, 0.8)'
                },
                // Mapping the old 'surface' / 'primary' names to cedar colors to make conversion easier,
                // or just overwriting the previous Tailwind variables
                background: '#F9F7F2', // alabaster
                'on-background': '#121415', // midnight
                primary: '#1B3022', // forest
                'on-primary': '#F9F7F2',
                secondary: '#AA8C55', // bronze
                'on-secondary': '#121415',
                surface: '#ffffff',
                'on-surface': '#121415',
            },
            fontFamily: {
                headline: ['"Playfair Display"', 'serif'],
                body: ['Inter', 'sans-serif'],
                label: ['Inter', 'sans-serif'] // For UI small text
            }
        }
    }
};
