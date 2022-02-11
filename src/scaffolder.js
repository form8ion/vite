import {scaffold as scaffoldConfig} from './config';

export default async function ({projectRoot}) {
  await scaffoldConfig({projectRoot});

  return {
    devDependencies: ['vite'],
    scripts: {
      'build:js': 'vite build',
      watch: 'run-s \'build:js -- --watch\''
    }
  };
}
