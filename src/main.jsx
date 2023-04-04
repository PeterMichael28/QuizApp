import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './App'
import './index.scss'
import { store } from './store/store';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
  <Provider store={store}>
  <React.StrictMode>
    <ToastContainer />
  <RouterProvider router={router} />
  </React.StrictMode>
  </Provider>,
)
