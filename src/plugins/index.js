import { Twitter } from './twitter';
import { Test } from './test';
import createPanel from '../components/panel/Panel';

let plugins = [createPanel(Twitter), createPanel(Test)];

export default plugins;
