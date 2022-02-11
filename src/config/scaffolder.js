import {promises as fs} from 'fs';

export default async function ({projectRoot}) {
  await fs.writeFile(
    `${projectRoot}/vite.config.js`,
    `import {defineConfig} from 'vite';

export default defineConfig({})`
  );
}
