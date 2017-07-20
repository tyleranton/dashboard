import { Twitter } from './twitter';
import { Test } from './test';
import { Todoist } from './todoist';
import createPanel from '../components/panel/Panel';

let plugins = [
  createPanel(Twitter, { width: '250px', bgColor: 'pink' }),
  createPanel(Test, { width: '350px', height: '300px', resize: 'both' }),
  createPanel(Todoist)
];

export default plugins;
