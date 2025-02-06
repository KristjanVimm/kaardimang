import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavigationBar from './components/NavigationBar'
import Login from './pages/Login';
import Game from './pages/Game';
import ScoreBoard from './pages/ScoreBoard';
import AddUser from './pages/AddUser';

function App() {

  const [userId, setUserId] = useState<string>("");

  return (
    <>
      
      <NavigationBar />

      <Routes>
        <Route path='/' element={<Login userId={userId} setUserId={setUserId}/>}/>
        <Route path='/game' element={<Game userId={userId} />}/>
        <Route path='/scoreboard' element={<ScoreBoard />}/>
        <Route path='/user' element={<AddUser />}/>
      </Routes>

    </>
  )

}

export default App
