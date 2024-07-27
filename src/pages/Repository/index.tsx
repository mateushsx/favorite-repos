import { useEffect, useState } from 'react';
import { TRepository, TRepositoryIssue } from '../../types';
import { githubService } from '../../services/github';
import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

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

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-6 bg-slate-200 p-4 max-w-md w-full rounded mx-4 pb-8">
        <button>
          <ArrowLeft color="black" />
        </button>

        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="rounded-full overflow-hidden">
            <img
              src={repository.owner?.avatar_url}
              alt={repository?.owner?.login}
              className="w-40 h-40"
            />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            {repository.name}
          </h2>

          <p className="text-slate-900">{repository.description}</p>
        </div>

        <ul className="flex flex-col gap-4 h-96 overflow-y-scroll overflow-x-hidden">
          {issues.map((issue) => (
            <li
              key={issue.id}
              className="flex flex-col gap-4 justify-center items-center"
            >
              <div className="rounded-full overflow-hidden">
                <img
                  src={issue.user?.avatar_url}
                  alt={issue?.user?.login}
                  className="w-40 h-40"
                />
              </div>

              <div>
                <strong className="flex flex-col gap-2">
                  <a
                    className="font-bold text-slate-900"
                    href={issue.html_url}
                    target="_blank"
                  >
                    {issue.title}
                  </a>

                  <div>
                    {issue.labels.map((label) => (
                      <span
                        key={label.id}
                        style={{ background: `#${label.color || 'ccc'}` }}
                        className="inline-block text-slate-900 rounded-full px-3 py-1 text-sm font-semibold"
                      >
                        {label.name}
                      </span>
                    ))}
                  </div>
                </strong>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
