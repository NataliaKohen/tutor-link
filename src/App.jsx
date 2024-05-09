import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detail from './routes/detail/Detail';
import Layout from './components/layout/Layout';
import Home from './routes/home/Home';
import Admin from './routes/admin/Admin.jsx';
import { ContextProvider } from './components/utils/globalContext.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
      <ContextProvider>
        <Routes>
          
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/detalle/:id" element={<Detail/>} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
        </ContextProvider>
      </BrowserRouter>
    
    </>
  );
}

export default App;
