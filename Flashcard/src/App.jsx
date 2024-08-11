import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home, Login, Admin } from './pages/index.js';
import Navbar from './components/Navbar';
import axios from 'axios';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      axios.get('http://localhost:5000/flashcards')
        .then(response => setFlashcards(response.data))
        .catch(error => console.error('Error fetching flashcards:', error));
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleAddFlashcard = (flashcard) => {
    axios.post('http://localhost:5000/flashcards', flashcard)
      .then(response => setFlashcards([...flashcards, response.data]))
      .catch(error => console.error('Error adding flashcard:', error));
  };

  const handleEditFlashcard = (id, updatedFlashcard) => {
    axios.put(`http://localhost:5000/flashcards/${id}`, updatedFlashcard)
      .then(() => {
        setFlashcards(flashcards.map(fc => (fc.id === id ? updatedFlashcard : fc)));
      })
      .catch(error => console.error('Error updating flashcard:', error));
  };

  const handleDeleteFlashcard = (id) => {
    axios.delete(`http://localhost:5000/flashcards/${id}`)
      .then(() => {
        setFlashcards(flashcards.filter(fc => fc.id !== id));
      })
      .catch(error => console.error('Error deleting flashcard:', error));
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home flashcards={flashcards} />} />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Admin
                  flashcards={flashcards}
                  onAdd={handleAddFlashcard}
                  onEdit={handleEditFlashcard}
                  onDelete={handleDeleteFlashcard}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
