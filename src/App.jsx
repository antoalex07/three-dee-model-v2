import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Model from './pages/basics/Model'
import Model3 from './pages/basics/Model3'

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/model' element={<Model/>}/>
        <Route path='/model3' element={<Model3/>}/>
      </Routes>
    </div>
  )
}

export default App
