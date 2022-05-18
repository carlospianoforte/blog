import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './Menu'
import Publicaciones from './Publicaciones';
import Users from './Users';

const App = () => (
  <BrowserRouter>
    <Menu />
    <Routes>
          <Route exact path='/' element={<Users />} />
{/*           <Route exact path='/tareas' element={<Tareas />} />
 */}          <Route exact path='/publicaciones/:key' element={<Publicaciones />} />

    </Routes>
  </BrowserRouter>
);

export default App