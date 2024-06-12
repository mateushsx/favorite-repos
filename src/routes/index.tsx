import { Main } from '../pages/Main';
import { Reporitory } from '../pages/Repository';
import { Route, Routes } from 'react-router-dom';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/repository/:fullname" element={<Reporitory />} />
      <Route path="/" element={<Main />} />
    </Routes>
  );
}
