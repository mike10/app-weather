import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import FullForecast from './components/FullForecast/FullForecast';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
//const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route index  path="/" element={<App />} />
          <Route path=":city" element={<FullForecast />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
