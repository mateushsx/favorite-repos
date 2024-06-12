import { githubApi } from '../settings/apis';

export const githubService = {
  getRepository: async (id: string) => {
    const response = await githubApi.get(`/repos/${id}`);
    return response.data;
  },
};
