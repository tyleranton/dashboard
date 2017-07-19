import { Twitter } from './twitter';
import { Test } from './test';
import createPanel from '../components/panel/Panel';

let plugins = [
  createPanel(Twitter, { width: '250px' }),
  createPanel(Test, { width: '350px', height: '300px', resize: 'both' })
];

export default plugins;
