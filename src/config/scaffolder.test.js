import {promises as fs} from 'node:fs';
import {projectTypes} from '@form8ion/javascript-core';

import {afterEach, describe, it, expect, vi} from 'vitest';
import any from '@travi/any';

import scaffoldConfig from './scaffolder.js';

vi.mock('node:fs');

describe('config scaffolder', () => {
  const projectRoot = any.string();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should enable the library mode for a package project-type', async () => {
    const {devDependencies} = await scaffoldConfig({projectRoot, projectType: projectTypes.PACKAGE});

    expect(fs.writeFile).toHaveBeenCalledWith(
      `${projectRoot}/vite.config.js`,
      `import {defineConfig} from 'vite';
import autoExternal from 'rollup-plugin-auto-external';

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
    },
    rollupOptions: {
      plugins: [autoExternal()]
    }
  }
});`
    );
    expect(devDependencies).toEqual(['rollup-plugin-auto-external']);
  });

  it('should not enable library mode for other project-types', async () => {
    const {devDependencies} = await scaffoldConfig({projectRoot, projectType: any.word()});

    expect(fs.writeFile).toHaveBeenCalledWith(
      `${projectRoot}/vite.config.js`,
      `import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    sourcemap: true
  }
});`
    );
    expect(devDependencies).toEqual([]);
  });
});
