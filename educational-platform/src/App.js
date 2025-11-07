import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={user ? (
            user.role === 'student' ? 
              <Navigate to="/student-dashboard" /> : 
            user.role === 'teacher' ? 
              <Navigate to="/teacher-dashboard" /> :
            user.role === 'admin' ?
              <Navigate to="/admin-dashboard" /> :
              <Navigate to="/" />
          ) : (
            <Login onLogin={handleLogin} />
          )} />
          
          <Route path="/student-dashboard/*" element={
            user && (user.role === 'student' || user.role === 'admin') ? 
              <StudentDashboard user={user} onLogout={handleLogout} /> : 
              <Navigate to="/" />
          } />
          
          <Route path="/teacher-dashboard/*" element={
            user && (user.role === 'teacher' || user.role === 'admin') ? 
              <TeacherDashboard user={user} onLogout={handleLogout} /> : 
              <Navigate to="/" />
          } />
          
          <Route path="/admin-dashboard/*" element={
            user && user.role === 'admin' ? 
              <AdminDashboard user={user} /> : 
              <Navigate to="/" />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
