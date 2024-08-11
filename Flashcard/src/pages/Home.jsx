import React from 'react';
import FlashcardList from '../components/FlashcardList';

const Home = ({ flashcards }) => {
  return (
    <div className="pt-16 ">
      <h1 className="text-2xl text-center font-bold mb-4">Flashcard Learning Tool</h1>
      <FlashcardList flashcards={flashcards} />
    </div>
  );
};

export default Home;
