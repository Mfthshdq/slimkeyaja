import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Admin from './Dashboard/Admin/Admin';
import Karyawan from './Dashboard/Karyawan/Karyawan';
import Login from './Dashboard/Login/Login';
import ProtectedRoute from './Component/ProtectedRoute';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/admin" element={
          <ProtectedRoute allowedRole="admin">
            <Admin />
          </ProtectedRoute>
        }></Route>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/karyawan' element={<Karyawan />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
