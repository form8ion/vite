import deepmerge from 'deepmerge';

import {scaffold as scaffoldConfig} from './config/index.js';

export default async function ({projectRoot, projectType}) {
  const configResults = await scaffoldConfig({projectRoot, projectType});

  return deepmerge.all([
    {
      dependencies: {javascript: {development: ['vite']}},
      scripts: {
        'build:js': 'vite build',
        watch: 'run-s \'build:js -- --watch\''
      }
    },
    configResults
  ]);
}
