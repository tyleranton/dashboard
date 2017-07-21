import { Twitter } from './twitter';
import { Test } from './test';
import { Todoist } from './todoist';
import createPanel from '../components/panel/Panel';

let plugins = [
  createPanel(Twitter, { width: '250px', height: '475px', bgColor: 'pink' }),
  createPanel(Todoist, { resize: 'both' }),
  createPanel(Test, { width: '350px', height: '300px', resize: 'both' })
];

export default plugins;
