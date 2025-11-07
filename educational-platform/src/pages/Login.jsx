import React, { useState } from 'react';
import { teacherAccount, studentAccounts, adminAccount } from '../data/demoData';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Login logic
      if (role === 'teacher') {
        if (email === teacherAccount.email && password === teacherAccount.password) {
          onLogin({ ...teacherAccount });
          localStorage.setItem('user', JSON.stringify(teacherAccount));
        } else {
          setError('Invalid teacher credentials');
        }
      } else if (role === 'admin') {
        if (email === adminAccount.email && password === adminAccount.password) {
          onLogin({ ...adminAccount });
          localStorage.setItem('user', JSON.stringify(adminAccount));
        } else {
          setError('Invalid admin credentials');
        }
      } else {
        const student = studentAccounts.find(
          (student) => student.email === email && student.password === password
        );
        if (student) {
          onLogin({ ...student });
          localStorage.setItem('user', JSON.stringify(student));
        } else {
          setError('Invalid student credentials');
        }
      }
    } else {
      // For demo purposes, just show a message
      setError('Sign up functionality is disabled in demo mode. Please use demo accounts.');
    }
  };

  const handleDemoAccount = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setRole(account.role);
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-title">Educational Platform</h1>
        <div className="login-tabs">
          <button
            className={`login-tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`login-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-control"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="demo-accounts">
          <h3>Demo Accounts</h3>
          <div className="demo-account-list">
            <div className="demo-account" onClick={() => handleDemoAccount(teacherAccount)}>
              <strong>Teacher:</strong> {teacherAccount.email} / {teacherAccount.password}
            </div>
            <div className="demo-account" onClick={() => handleDemoAccount(adminAccount)}>
              <strong>Admin:</strong> {adminAccount.email} / {adminAccount.password}
            </div>
            {studentAccounts.map((student) => (
              <div
                key={student.id}
                className="demo-account"
                onClick={() => handleDemoAccount(student)}
              >
                <strong>Student {student.id.slice(-1)}:</strong> {student.email} / {student.password}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;