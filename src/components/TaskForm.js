import React, { useState, useRef, useEffect } from 'react';

export default function TaskForm({ dispatch }) {
  const [title, setTitle] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { id: Date.now(), text: title, completed: false, isEditing: false };
    dispatch(newTask);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
}