import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Fetch flashcards from the server when the component mounts
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/flashcards');
        setFlashcards(response.data);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, []);

  const handleAdd = async () => {
    if (editIndex === null) {
      try {
        const response = await axios.post('http://localhost:5000/flashcards', newFlashcard);
        setFlashcards([...flashcards, response.data]);
        setNewFlashcard({ question: '', answer: '' });
      } catch (error) {
        console.error('Error adding flashcard:', error);
      }
    } else {
      try {
        const flashcard = flashcards[editIndex];
        await axios.put(`http://localhost:5000/flashcards/${flashcard.id}`, newFlashcard);
        const updatedFlashcards = flashcards.map((fc, index) => (index === editIndex ? { ...fc, ...newFlashcard } : fc));
        setFlashcards(updatedFlashcards);
        setEditIndex(null);
        setNewFlashcard({ question: '', answer: '' });
      } catch (error) {
        console.error('Error updating flashcard:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/flashcards/${id}`);
      setFlashcards(flashcards.filter(flashcard => flashcard.id !== id));
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Question"
          value={newFlashcard.question}
          onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
          className="border p-2 rounded-lg w-full mb-2"
        />
        <input
          type="text"
          placeholder="Answer"
          value={newFlashcard.answer}
          onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
          className="border p-2 rounded-lg w-full"
        />
        <button
          onClick={handleAdd}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          {editIndex === null ? 'Add Flashcard' : 'Update Flashcard'}
        </button>
      </div>
      <div>
        {flashcards.map((flashcard, index) => (
          <div key={flashcard.id} className="flex items-center justify-between mb-2 p-2 border rounded-lg">
            <span>{flashcard.question}</span>
            <button
              onClick={() => {
                setEditIndex(index);
                setNewFlashcard(flashcard);
              }}
              className="px-2 mx-2 py-1 bg-yellow-500 text-white rounded-lg"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(flashcard.id)}
              className="px-2 py-1 bg-red-500 text-white rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
