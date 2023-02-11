import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Main = lazy(() => import('./pages/Main/Main'));
const Todo = lazy(() => import('./pages/Todo/Todo'));

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
