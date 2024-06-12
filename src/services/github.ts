import { TRepository, TRepositoryIssue } from '../types';
import { githubApi } from '../settings/apis';

export const githubService = {
  getRepository: async (repository_fullname: string): Promise<TRepository> => {
    const response = await githubApi.get(`/repos/${repository_fullname}`);
    return response.data;
  },

  getIssues: async (
    repository_fullname: string
  ): Promise<TRepositoryIssue[]> => {
    const response = await githubApi.get(
      `/repos/${repository_fullname}/issues`
    );
    return response.data;
  },
};
