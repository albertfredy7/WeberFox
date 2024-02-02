
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Users from './pages/Users';
import PlaceList from './pages/PlaceList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Users/>} />
        <Route path='/:userId/places' element={<PlaceList/>} />
      </Routes>
    </div>
  );
}

export default App;
