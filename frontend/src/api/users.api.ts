import { BASE_URL } from './base.api';

const endpoint = 'users';

type userData = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const users = {
  create: async (data: userData) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  update: async (data: userData, id: string) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}/update/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  getAll: async () => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}/find-all`);
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  getById: async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}/find/${id}`);
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  delete: async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}/delete/${id}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
