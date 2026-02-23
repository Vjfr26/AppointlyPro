import { defineConfig } from 'vite';

export default defineConfig({
    root: './',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: 'index.html',
                'no-sidebar': 'no-sidebar.html',
                'right-sidebar': 'right-sidebar.html',
                'left-sidebar': 'left-sidebar.html',
            },
        },
    },
    server: {
        port: 3000,
        open: true,
    },
});
