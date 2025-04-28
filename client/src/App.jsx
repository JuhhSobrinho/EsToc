import { HashRouter  as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login';
import SingUp from './singUp';
import Dashboard from './main/dashboard';
import SplashScreen from './splash';
import './App.css'

function App() {

  return (
    <Router basename='/'>
          <Routes>
            <Route path="/" element={<Navigate to="/Login"/>} />
            <Route path="/Login" element={<Login />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="/SingUp" element={<SingUp />} />
            <Route path="/SplashScreen" element={<SplashScreen />} />
          </Routes>
    </Router>
  )
}

export default App
