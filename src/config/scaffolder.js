import {promises as fs} from 'fs';
import {projectTypes} from '@form8ion/javascript-core';

export default async function ({projectRoot, projectType}) {
  await fs.writeFile(
    `${projectRoot}/vite.config.js`,
    `import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    sourcemap: true
  }
});`
  );

  return {devDependencies: [...projectTypes.PACKAGE === projectType ? ['rollup-plugin-auto-external'] : []]};
}
