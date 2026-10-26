import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Chat from './pages/chat/Chat'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' Component={Login}/>
        <Route path='/web' Component={Chat}/>
      </Routes>
    </>
  )
}

export default App
