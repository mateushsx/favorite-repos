import { useEffect, useMemo, useState } from 'react';
import { TRepository, TRepositoryIssue } from '../../types';
import { githubService } from '../../services/github';
import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function Reporitory() {
  const [page, setPage] = useState(1);
  const [repository, setRepository] = useState<TRepository>({} as TRepository);
  const [issues, setIssues] = useState<TRepositoryIssue[]>([]);
  const [filter, setFilter] = useState<'open' | 'closed' | 'all'>('open');

  const { fullname } = useParams();

  const { isAll, isOpen, isClosed } = useMemo(() => {
    return {
      isAll: filter === 'all',
      isOpen: filter === 'open',
      isClosed: filter === 'closed',
    };
  }, [filter]);

  useEffect(() => {
    async function loadData() {
      if (!fullname) return;

      const [repositoryData, issuesData] = await Promise.all([
        githubService.getRepository(fullname),
        githubService.getIssues(fullname, 1),
      ]);

      setRepository(repositoryData);
      setIssues(issuesData);
    }

    loadData();
  }, [fullname]);

  useEffect(() => {
    async function loadIssues() {
      if (!fullname) return;

      const issuesData = await githubService.getIssues(fullname, page, filter);
      setIssues(issuesData);
    }

    loadIssues();
  }, [fullname, page, filter]);

  const previousPage = async () => {
    if (page <= 1) return;
    const newPage = page - 1;

    setPage(newPage);
  };

  const nextPage = async () => {
    const newPage = page + 1;

    setPage(newPage);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-6 bg-slate-200 p-4 max-w-screen-md w-full rounded mx-4 pb-8">
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

        <div className="flex gap-2">
          <button
            className={`${
              isOpen
                ? 'bg-blue-700 text-white'
                : 'border border-slate-700 text-slate-900'
            } rounded  p-1`}
            onClick={() => setFilter('open')}
          >
            Open
          </button>
          <button
            className={`${
              isClosed
                ? 'bg-blue-700 text-white'
                : 'border border-slate-700 text-slate-900'
            } rounded  p-1`}
            onClick={() => setFilter('closed')}
          >
            Closed
          </button>
          <button
            className={`${
              isAll
                ? 'bg-blue-700 text-white'
                : 'border border-slate-700 text-slate-900'
            } rounded  p-1`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
        </div>

        <ul className="flex flex-col gap-4 p-2 h-96 overflow-y-scroll overflow-x-hidden">
          {issues.map((issue) => (
            <li key={issue.id} className="flex gap-4 items-center">
              <div className="rounded-full overflow-hidden">
                <img
                  src={issue.user?.avatar_url}
                  alt={issue?.user?.login}
                  className="w-10 h-10"
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

                  <div className="flex gap-1">
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

                <p className="text-slate-700">{issue.user?.login}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-center items-center gap-2">
          <button
            className={`${
              page <= 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'
            } p-1 border rounded`}
            disabled={page <= 1}
            onClick={previousPage}
          >
            Voltar
          </button>

          <p className="text-slate-800">Página: {page}</p>

          <button className="bg-blue-500 p-1 border rounded" onClick={nextPage}>
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
