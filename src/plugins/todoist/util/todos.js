import axios from 'axios';
import moment from 'moment';

const uuid = require('uuid/v4');

const config = {
  token: ''
};

const url = 'https://todoist.com/api/v7/sync';

export const getTodos = () => {
  return axios
    .get(url, {
      params: {
        token: config.token,
        sync_token: '*',
        resource_types: '["items"]'
      }
    })
    .then(res => res.data.items.filter(todo => isToday(todo)))
    .catch(err => Promise.reject(err));
};

export const completeTodo = todo => {
  return axios
    .get(url, {
      params: {
        token: config.token,
        sync_token: '*',
        resource_types: '["items"]',
        commands: `[
          {
            "type": "item_complete",
            "uuid": "${uuid()}",
            "args": { "ids": ["${todo.id}"] }
          }
        ]`
      }
    })
    .then(res => res.data.items.filter(todo => isToday(todo)))
    .catch(err => Promise.reject(err));
};

const isToday = todo => {
  const time = { hour: 0, minute: 0, second: 0, millisecond: 0 };

  const todoDate = moment(todo.due_date_utc);
  todoDate.set(time);
  const today = moment();
  today.set(time);

  return today.isSame(todoDate);
};
