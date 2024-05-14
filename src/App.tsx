import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Lists from './Lists';
import Login from './Login';

const App = () => {
   return (
      <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/todo" element={<Lists />} />
      </Routes>
   );
};

export default App;
