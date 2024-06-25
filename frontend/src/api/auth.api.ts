import { UserLoginData } from '../types/user.type';
import { BASE_URL } from './base.api';

const endpoint = 'auth';

export const auth = {
  login: async (data: UserLoginData) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}/login`, {
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
};
