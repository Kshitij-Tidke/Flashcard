import React, { useState } from 'react';

const Flashcard = ({ frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`w-1/3 mt-16 mb-6 h-48 bg-white rounded-lg shadow-lg p-6 flex items-center justify-center cursor-pointer transition-transform duration-300 ${isFlipped ? 'rotateY-180' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="w-full h-full flex items-center justify-center">
        {isFlipped ? backContent : frontContent}
      </div>
    </div>
  );
};

export default Flashcard;
