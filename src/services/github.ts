import { TRepository } from '../types';
import { githubApi } from '../settings/apis';

export const githubService = {
  getRepository: async (id: string): Promise<TRepository> => {
    const response = await githubApi.get(`/repos/${id}`);
    return response.data;
  },
};
