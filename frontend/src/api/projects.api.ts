import { CreateProjectType } from '../types/project.type';
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
  create: async (
    userId: string,
    body: CreateProjectType,
    accessToken: string,
  ) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}/create/${userId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          access_token: accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
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
  edit: async (
    projectId: string,
    body: CreateProjectType,
    accessToken: string,
  ) => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoint}/update/${projectId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            access_token: accessToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
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
  delete: async (id: string, accessToken: string) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}/delete/${id}`, {
        method: 'DELETE',
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
