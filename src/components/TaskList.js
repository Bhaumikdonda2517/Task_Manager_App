import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onDelete, onToggle, onToggleEdit, onEditTask }) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} onToggleEdit={onToggleEdit} onEditTask={onEditTask} />
      ))}
    </ul>
  );
}