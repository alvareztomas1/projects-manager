import { AddTask } from '../types/task.type';
import { BASE_URL } from './base.api';

const endpoint = 'tasks';

export const tasks = {
  create: async (taskId: string, body: AddTask, accessToken: string) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}/create/${taskId}`, {
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
  edit: async (projectId: string, body: AddTask, accessToken: string) => {
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
  findTasksByProject: async (projectId: string, accessToken: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoint}/find-all/${projectId}`,
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
