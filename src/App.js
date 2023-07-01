import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import StudentList from './components/StudentList';
import TeacherList from './components/TeacherList';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/students" element={<StudentList />} />
          <Route path="/teachers" element={<TeacherList />} />
          <Route path="/" element={<h1>Welcome to the Admin Dashboard</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
