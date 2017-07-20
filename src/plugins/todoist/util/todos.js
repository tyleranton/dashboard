import axios from 'axios';

const config = {
  token: ''
};

const url = `https://todoist.com/api/v7/sync?token=${config.token}&sync_token=*&resource_types=["items"]`;

export const getTodos = () => {
  let todos = [];
  if (config.token) axios.get(url).then(res => (todos = res.data.items));
  return todos;
};
