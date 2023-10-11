import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Missions from './components/Missions';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Rockets from './components/Rockets';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Rockets />} />
          <Route path="missions" element={<Missions />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
