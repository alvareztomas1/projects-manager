import { BASE_URL } from './base.api';
import { UserData, UserSignUpData } from '../types/user.type';

const endpoint = 'users';

export const users = {
  create: async (data: UserSignUpData) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseJSON = await response.json();

      if (!response.ok) {
        throw new Error((responseJSON as Error).message);
      }

      return responseJSON;
    } catch (error) {
      throw error;
    }
  },
  update: async (data: UserSignUpData, id: string) => {
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
  getById: async (id: string, accessToken: string) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}/find/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          access_token: accessToken,
          'Content-Type': 'application/json',
        },
      });
      const responseJSON = await response.json();

      if (!response.ok) {
        throw new Error((responseJSON as Error).message);
      }

      return responseJSON;
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
  findPartial: async (key: keyof UserData, value: any, accessToken: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoint}/find-partial/${key}/${value}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            access_token: accessToken,
            'Content-Type': 'application/json',
          },
        },
      );
      const responseJSON = await response.json();

      if (!response.ok) {
        throw new Error((responseJSON as Error).message);
      }

      return responseJSON;
    } catch (error) {
      throw error;
    }
  },
};
