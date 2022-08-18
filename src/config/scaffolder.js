import {promises as fs} from 'fs';
import {projectTypes} from '@form8ion/javascript-core';

export default async function ({projectRoot, projectType}) {
  await fs.writeFile(
    `${projectRoot}/vite.config.js`,
    `import {defineConfig} from 'vite';${
      projectTypes.PACKAGE === projectType
        ? `
import autoExternal from 'rollup-plugin-auto-external';`
        : ''
    }

export default defineConfig({
  build: {
    sourcemap: true${
  projectTypes.PACKAGE === projectType
    ? `,
    lib: {
    },
    rollupOptions: {
      plugins: [autoExternal()]
    }`
    : ''
}
  }
});`
  );

  return {devDependencies: [...projectTypes.PACKAGE === projectType ? ['rollup-plugin-auto-external'] : []]};
}
