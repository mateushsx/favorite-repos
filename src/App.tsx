import { ToastContainer } from 'react-toastify';

import { AppRoutes } from './routes';

function App() {
  return (
    <div className="bg-slate-900 h-screen text-white">
      <AppRoutes />
      <ToastContainer />
    </div>
  );
}
export default App;
