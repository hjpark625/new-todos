import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import Router from './Router';
import store from './modules';
import GlobalStyle from './styles/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <Router />
  </Provider>
);
