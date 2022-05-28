import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './Menu'
import Publicaciones from './Publicaciones';
import Users from './Users';
import Tareas from './Tareas';
import TareasGuardar from './Tareas/Guardar'

const App = () => (
  <BrowserRouter>
    <Menu />
    <Routes>
          <Route exact path='/' element={<Users />} />
          <Route exact path='/tareas' element={<Tareas />} />
          <Route exact path='/publicaciones/:key' element={<Publicaciones />} />
          <Route exact path='/tareas/guardar' element={<TareasGuardar />} />
          <Route exact path='/tareas/guardar/:usu_id/:tar_id' element={<TareasGuardar />} />


    </Routes>
  </BrowserRouter>
);

export default App