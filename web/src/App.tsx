import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './pages/MainLayout'
import Home from './pages/home/Home'
import PerfilUsuario from './components/user/PerfilUsuario'
import Sobre from './pages/sobre/Sobre'
import Contato from './pages/contato/Contato'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'

function App() {

  return (
    <>
    <Routes>
      <Route Component={MainLayout}>
        <Route path='/' Component={Home}></Route>
        <Route path='/sobre' Component={Sobre}></Route>
        <Route path='/contato' Component={Contato}></Route>
        <Route path='/user/:id' Component={PerfilUsuario}></Route>
      </Route>
      <Route path='/login' Component={Login}/>
      <Route path='/register' Component={Cadastro}/>
    </Routes>
    </>
  )
}

export default App
