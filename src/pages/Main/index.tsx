import { toast } from 'react-toastify';
import { useCallback, useState } from 'react';
import { Github, Plus } from 'lucide-react';

import { TRepository } from '../../types';
import { githubService } from '../../services/github';

export function Main() {
  const [repositories, setRepositories] = useState<TRepository[]>([]);
  const [repositoryName, setRepositoryName] = useState('');

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

      setRepositories([...repositories, response]);
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
            className="bg-green-700 p-1 rounded hover:opacity-25"
            onClick={handleAddRepository}
          >
            <Plus />
          </button>
        </div>
      </div>
    </div>
  );
}
