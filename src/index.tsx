import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './styles/globals.scss';
import { setupStore } from './store/store.ts';
import {BrowserRouter} from "react-router-dom";

const store = setupStore();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>

);
