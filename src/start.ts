import { resolve } from 'path';
import { init } from './server';

const endpointDir = resolve(__dirname, './endpoints');

init(`${endpointDir}/**/*.endpoint.@(js|ts)`);