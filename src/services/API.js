import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pixabay.com/api',
});

export default function getRequest(query, page) {
  return api.get(
    `/?q=${query}&key=26835433-5e813848e8d233e22f218db79&per_page=12&page=${page}`
  );
}
