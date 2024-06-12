import { useEffect, useState } from 'react';
import { TRepository, TRepositoryIssue } from '../../types';
import { githubService } from '../../services/github';
import { useParams } from 'react-router-dom';

export function Reporitory() {
  const [repository, setRepository] = useState<TRepository>({} as TRepository);
  const [issues, setIssues] = useState<TRepositoryIssue[]>([]);

  const { fullname } = useParams();

  useEffect(() => {
    async function loadData() {
      if (!fullname) return;

      const [repositoryData, issuesData] = await Promise.all([
        githubService.getRepository(fullname),
        githubService.getIssues(fullname),
      ]);

      setRepository(repositoryData);
      setIssues(issuesData);
    }

    loadData();
  }, [fullname]);

  return <div>Reporitory</div>;
}
