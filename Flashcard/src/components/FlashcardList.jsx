import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import axios from 'axios';

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/flashcards');
        setFlashcards(response.data);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
        alert('Unable to fetch flashcards. Please check your backend server.');
      }
    };

    fetchFlashcards();
  }, []);

  if (flashcards.length === 0) {
    return <p className="text-gray-500">No flashcards available.</p>;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="flex flex-col items-center">
      <Flashcard
        frontContent={flashcards[currentIndex]?.question || "No Question"}
        backContent={flashcards[currentIndex]?.answer || "No Answer"}
      />
      <div className="flex mt-4 space-x-4">
        <button
          onClick={handlePrevious}
          disabled={flashcards.length <= 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={flashcards.length <= 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardList;
