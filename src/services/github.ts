import { TRepository, TRepositoryIssue } from '../types';
import { githubApi } from '../settings/apis';

export const githubService = {
  getRepository: async (repository_fullname: string): Promise<TRepository> => {
    const response = await githubApi.get(`/repos/${repository_fullname}`);
    return response.data;
  },

  getIssues: async (
    repository_fullname: string,
    page: number,
    state: 'open' | 'closed' | 'all' = 'open'
  ): Promise<TRepositoryIssue[]> => {
    const response = await githubApi.get(
      `/repos/${repository_fullname}/issues`,
      {
        params: {
          state,
          per_page: 5,
          page,
        },
      }
    );
    return response.data;
  },
};
