
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import BlogPostForm from './components/BlogPostForm';
import BlogPostList from './components/BlogPostList';
import Login from './components/Login';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="container">
      <header>
        <h1>Blog Platform</h1>
      </header>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={user ? <BlogPostForm /> : <Navigate to="/login" />} />
          <Route path="/edit/:id" element={user ? <BlogPostForm /> : <Navigate to="/login" />} />
          <Route path="/" element={user ? <BlogPostList /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
