import {scaffold as scaffoldConfig} from './config';

export default async function ({projectRoot}) {
  await scaffoldConfig({projectRoot});

  return {devDependencies: ['vite']};
}
