import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from '@app';

import { appStore } from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={appStore}>
    <App />
  </Provider>
);
