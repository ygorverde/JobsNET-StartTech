import { BrowserRouter } from 'react-router-dom';

import { Template } from './components/Template';

import { Routes } from './components/Routes';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
      <BrowserRouter>
        <Template>
          <ToastContainer />
          <Routes />
        </Template>
      </BrowserRouter>
    );
  }

export default App;
