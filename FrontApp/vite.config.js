import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import babel from 'vite-plugin-babel';
import path from 'path';

export default defineConfig({
  root: './src', // Carpeta raíz para el código fuente
  publicDir: '../public', // Carpeta para archivos públicos
  build: {
    outDir: '../../wwwroot', // Genera archivos en wwwroot de .NET
    emptyOutDir: true, // Limpia la carpeta de salida
    commonjsOptions: {
        exclude: ['inferno', 'inferno-compat', 'frappe-gantt']
    }
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
  optimizeDeps: {
    exclude: ['inferno', 'inferno-compat', 'frappe-gantt']
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'inferno': process.env.NODE_ENV === 'development'
        ? path.resolve(__dirname, 'node_modules/inferno/dist/index.dev.mjs')
        : path.resolve(__dirname, 'node_modules/inferno/dist/index.mjs'),
      'inferno-router': process.env.NODE_ENV === 'development'
        ? path.resolve(__dirname, 'node_modules/inferno-router/dist/index.dev.mjs')
        : path.resolve(__dirname, 'node_modules/inferno-router/dist/index.mjs'),
      'react': 'inferno-compat',
      'react-dom': 'inferno-compat'
    }
  }
});