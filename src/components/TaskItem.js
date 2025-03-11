import React, { useState } from 'react';

const TaskItem = ({ task, onDelete, onToggle, onToggleEdit, onEditTask }) => {
  const [editedText, setEditedText] = useState(task.text);

  return (
    <li>
      {task.isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={() => onEditTask(task.id, editedText)}>Save</button>
        </>
      ) : (
        <>
          <span onClick={() => onToggle(task.id)}>{task.text}</span>
          <button onClick={() => onToggleEdit(task.id)}>Edit</button>
        </>
      )}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
};

export default TaskItem;