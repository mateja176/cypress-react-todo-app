import axios from 'axios';
import urlJoin from 'url-join';

const url = 'http://localhost:3030/api/todos';

export const saveTodo = todo => axios.post(url, todo);

export const loadTodos = () => axios.get(url);

export const deleteTodo = id => axios.delete(urlJoin(url, id.toString()));
