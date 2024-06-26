import { BASE_URL } from './base.api';

const endpoint = 'projects';

export const projects = {
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
};
