import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import './firebase';
import Login from './components/Login';
import { useStateValue } from './components/StateProvider';



function App() {
  const [{user}, dispatch] = useStateValue();

  return (
      //Уникальные ссылки для чатов
    <div className="app">
      <div className='app__body'>

        {!user ? (
          <Login />
        ): (
          <Router>
            {<Sidebar />}

            <Routes>
              <Route path="/rooms/:roomId" element={<Chat />} />
              <Route path="/" element={<Chat />} />
            </Routes>
          </Router>
        )}
        
      </div>
    </div>
  );
}

export default App;
