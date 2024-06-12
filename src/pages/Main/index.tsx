import { toast } from 'react-toastify';
import { useCallback, useEffect, useState } from 'react';
import { AlignJustify, Github, Plus, Trash2 } from 'lucide-react';

import { TRepository } from '../../types';
import { githubService } from '../../services/github';
import { useNavigate } from 'react-router-dom';

const REPOSITORIES_STORAGE_KEY = '@favorite-repos:repositories';

export function Main() {
  const [repositories, setRepositories] = useState<TRepository[]>([]);
  const [repositoryName, setRepositoryName] = useState('');

  const navigate = useNavigate();

  const handleUpdateRepositoriesStorage = (repositories: TRepository[]) => {
    localStorage.setItem(
      REPOSITORIES_STORAGE_KEY,
      JSON.stringify(repositories)
    );
  };

  const handleAddRepository = useCallback(async () => {
    try {
      if (!repositoryName) {
        return toast('Favor informar o nome do repositório', {
          type: 'error',
        });
      }

      const repositoryExists = repositories.find(
        (repository) => repository.full_name === repositoryName
      );

      if (repositoryExists) {
        return toast('Repositório ja adicionado!', {
          type: 'info',
        });
      }

      const response = await githubService.getRepository(repositoryName);
      const newListRepositories = [...repositories, response];

      setRepositories(newListRepositories);
      handleUpdateRepositoriesStorage(newListRepositories);
      setRepositoryName('');

      toast('Repositório adicionado com sucesso!', {
        type: 'success',
      });
    } catch (error) {
      toast('Repositório não encontrado', {
        type: 'error',
      });
      console.log('ERRO GET REPOSITORY', error);
    }
  }, [repositories, repositoryName]);

  const handleRemoveRepository = useCallback(
    (id: number) => {
      const filteredRepositories = repositories.filter(
        (repository) => repository.id !== id
      );

      setRepositories(filteredRepositories);
      handleUpdateRepositoriesStorage(filteredRepositories);
    },
    [repositories]
  );

  const handleRepositoryDetails = (fullname: string) => {
    navigate(`/repository/${encodeURIComponent(fullname)}`);
  };

  useEffect(() => {
    const repositories = localStorage.getItem(REPOSITORIES_STORAGE_KEY);
    if (repositories) {
      setRepositories(JSON.parse(repositories));
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-6 bg-slate-200 p-4 max-w-md w-full rounded mx-4 pb-8">
        <header className="flex gap-2">
          <Github size={32} className="text-slate-900" />
          <h1 className="text-2xl text-slate-900 font-bold">Repositórios</h1>
        </header>

        <div className="flex gap-1 w-full">
          <input
            value={repositoryName}
            onChange={(e) => setRepositoryName(e.target.value)}
            type="text"
            placeholder="Repositório"
            className="p-1 outline-none text-black border border-slate-300 w-full"
          />

          <button
            className="bg-green-700 p-1 rounded hover:opacity-70 transition-all"
            onClick={handleAddRepository}
          >
            <Plus />
          </button>
        </div>

        <ul className="flex flex-col gap-2">
          {repositories.map((repository) => (
            <li
              key={repository.id}
              className="flex items-center justify-between gap-2 border-slate-300 border-b  p-2"
            >
              <div className="flex gap-2 items-center">
                <Trash2
                  className="text-slate-900 hover:text-red-500 cursor-pointer transition-all"
                  onClick={() => handleRemoveRepository(repository.id)}
                />
                <h2 className="text-slate-900">{repository.full_name}</h2>
              </div>

              <AlignJustify
                className="text-slate-900 hover:text-blue-700 cursor-pointer transition-all"
                onClick={() => handleRepositoryDetails(repository.full_name)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
