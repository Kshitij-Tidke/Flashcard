import React from 'react';
import Dashboard from '../components/Dashboard';

const Admin = ({ flashcards, onAdd, onEdit, onDelete }) => {
  return (
    <div className="p-4">
      <Dashboard
        flashcards={flashcards}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default Admin;
