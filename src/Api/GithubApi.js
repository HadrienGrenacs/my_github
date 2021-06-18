import {GITHUB_KEY} from '@env';

const BASE_URL = 'https://api.github.com';
var header = new Headers({
  Authorization: 'Bearer ' + GITHUB_KEY,
  'Content-Type': 'application/json',
});

var monInit = {
  method: 'GET',
  headers: header,
  mode: 'cors',
  cache: 'default',
};

export const searchUsers = (login, page = 1) => {
  const url =
    BASE_URL + '/search/users?q=' + login + '&page=' + page + '&per_page=20';
  return fetch(url, monInit)
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const searchRepos = (name, page = 1) => {
  const url =
    BASE_URL +
    '/search/repositories?q=' +
    name +
    '&page=' +
    page +
    '&per_page=20';
  return fetch(url, monInit)
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const getUserByLogin = login => {
  const url = BASE_URL + '/users/' + login;
  return fetch(url, monInit)
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const getFollowers = login => {
  const url = BASE_URL + '/users/' + login + '/followers';
  return fetch(url, monInit)
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const getRepos = login => {
  const url = BASE_URL + '/users/' + login + '/repos';
  return fetch(url, monInit)
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const getRepoByName = (login, name) => {
  const url = BASE_URL + '/repos/' + login + '/' + name;
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const getContributors = (login, name) => {
  const url = BASE_URL + '/repos/' + login + '/' + name + '/contributors';
  return fetch(url, monInit)
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const getIssues = (login, name) => {
  const url = BASE_URL + '/repos/' + login + '/' + name + '/issues';
  return fetch(url, monInit)
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const getLanguages = (login, name) => {
  const url = BASE_URL + '/repos/' + login + '/' + name + '/languages';
  return fetch(url, monInit)
    .then(response => response.json())
    .then(data => {
      if (Object.entries(data).length > 0) {
        return Object.keys(data).reduce((a, b) => (data[a] > data[b] ? a : b));
      }
    })
    .catch(error => console.error(error));
};
