import { Github, Plus } from 'lucide-react';

export function Main() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-6 bg-slate-200 p-4 max-w-md w-full rounded mx-4 pb-8">
        <header className="flex gap-2">
          <Github size={32} className="text-slate-900" />
          <h1 className="text-2xl text-slate-900 font-bold">Repositórios</h1>
        </header>

        <div className="flex gap-1 w-full">
          <input
            type="text"
            placeholder="Repositório"
            className="p-1 outline-none text-black border border-slate-300 w-full"
          />

          <button type="submit" className="bg-green-700 p-1 rounded">
            <Plus />
          </button>
        </div>
      </div>
    </div>
  );
}
