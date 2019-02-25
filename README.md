# Dashboard (temp name until I come up with a new one)
This is a dashboard that allows you to create draggable/resizable plugins. The motivation behind this is to have a customizable dashboard of any info/functionality you want such as a Twitter feed, todos, calendars, etc.

![Demo](https://media.giphy.com/media/xUPGGFrMkW0uNJB5kc/giphy.gif)

# Plugins
Right now, plugins have to be manually created from within the project. In the future, the goal is to have an Atom-like plugin system.

With that being said, creating plugins is fairly simple (assuming you know React). Under the `./src/plugins/` directory, create a folder for your plugin. All you have to do then is create your component file(s), add an `index.js` file exporting your root component, then add your plugin to `./src/plugins/index.js`.

To do that final step, import your plugin, then add it to the `plugins` array wrapped in the `createPanel` HOC.

You can also configure the width, height, background color, and whether or not the panel can be resized. For example:
```
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
```

# Current State
Right now the code base needs some TLC since I put it together in one night. The styles and the drag and drop logic  need to be more flexible/responsive. Until the project is more robust, it is limited to running locally right now. I do plan on deploying it as a web app, though.

# Future State
There are a few features I have planned at this time:

- Atom-like plugin system.
- Sidebar that allows for selecting multiple saved dashboards, managing settings, etc.
- Theming

Along with these features, I'd like to create a desktop version (via Electron) and possible native mobile apps.

# Build
Make sure you have `Node.js` installed.

### Clone and `cd` into the project
`git clone https://github.com/tyleranton/dashboard.git && cd dashboard`

### Install dependencies
`npm install`

### Run the project
`npm start`
