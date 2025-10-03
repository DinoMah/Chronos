import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import babel from 'vite-plugin-babel';

export default defineConfig({
  root: './src', // Carpeta raíz para el código fuente
  publicDir: '../public', // Carpeta para archivos públicos
  build: {
    outDir: '../../wwwroot', // Genera archivos en wwwroot de .NET
    emptyOutDir: true, // Limpia la carpeta de salida
  },
  server: {
    port: 3000, // Puerto de desarrollo de Vite
    proxy: {
      '/api': {
        target: 'https://localhost:7099', // URL de tu Minimal API
        changeOrigin: true,
        secure: false, // Para certificados HTTPS autofirmados
      },
    },
  },
  plugins: [
    tailwindcss(),
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        babelrc: true,
        configFile: true
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
});