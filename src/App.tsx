import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Lists from './Lists';
import Login from './Login';
import Calendar from './Calender';

const App = () => {
   return (
      <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/todo" element={<Lists />} />
         <Route path="/todo" element={<Calendar currentDate={new Date()} onSelectDate={date => date} />} />
      </Routes>
   );
};

export default App;
