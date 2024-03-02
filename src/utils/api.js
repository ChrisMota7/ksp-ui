import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const request = async ({ method, endpoint, data, headers }) => {
  console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`)
  try {
    const response = await instance({
      method,
      url: endpoint,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const get = async (endpoint, headers = {}) => {
  return request({ method: 'GET', endpoint, headers });
};

export const post = async (endpoint, data, headers = {}) => {
  return request({ method: 'POST', endpoint, data, headers });
};

export const put = async (endpoint, data, headers = {}) => {
  return request({ method: 'PUT', endpoint, data, headers });
};

export const del = async (endpoint, headers = {}) => {
  return request({ method: 'DELETE', endpoint, headers });
};