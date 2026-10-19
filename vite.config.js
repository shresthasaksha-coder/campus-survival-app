import { defineConfig } from 'vite';
import { resolve } from 'node:path';
export default defineConfig({root:'frontend',server:{proxy:{'/api':'http://127.0.0.1:3001'}},build:{outDir:'../dist',emptyOutDir:true,rollupOptions:{input:{home:resolve('frontend/index.html'),housingDining:resolve('frontend/housing-dining.html')}}}});
