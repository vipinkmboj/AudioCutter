import React from 'react';
//import logo from './logo.svg';
import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Header from './Components/Header/Header';
//import AudioCutter from './Components/Main/AudioCutter';
import Home from './Components/Main/Home';
import Footer from './Components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route
          path='/'
          element={
            <Home
            
            />
          }
        />
       
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
