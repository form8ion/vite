import deepmerge from 'deepmerge';

import {scaffold as scaffoldConfig} from './config';

export default async function ({projectRoot, projectType}) {
  const configResults = await scaffoldConfig({projectRoot, projectType});

  return deepmerge.all([
    {
      devDependencies: ['vite'],
      scripts: {
        'build:js': 'vite build',
        watch: 'run-s \'build:js -- --watch\''
      }
    },
    configResults
  ]);
}
