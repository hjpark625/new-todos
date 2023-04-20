import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Main = lazy(() => import('./pages/Main/Main'));
const Todo = lazy(() => import('./pages/Todo/Todo'));

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route index element={<Main />} />
        <Route path={`${process.env.PUBLIC_URL}todo`} element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
