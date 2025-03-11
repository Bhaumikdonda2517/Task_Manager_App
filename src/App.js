import React, { useReducer, useEffect, useMemo, useContext, useCallback, useState } from 'react';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ThemeToggle from './components/ThemeToggle';
import Notification from './components/Notification';
import TaskFilter from './components/TaskFilter';

const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [];

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);
    case 'TOGGLE_COMPLETE':
      return state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    case 'TOGGLE_EDIT':
      return state.map(task =>
        task.id === action.payload ? { ...task, isEditing: !task.isEditing } : task
      );
    case 'EDIT_TASK':
      return state.map(task =>
        task.id === action.payload.id ? { ...task, text: action.payload.text, isEditing: false } : task
      );
    default:
      return state;
  }
};

export default function App() {
  const [tasks, dispatch] = useReducer(reducer, initialTasks);
  const { darkMode } = useContext(ThemeContext);
  const [notification, setNotification] = useState('');
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'COMPLETED':
        return tasks.filter(task => task.completed);
      case 'INCOMPLETE':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const handleDelete = useCallback((id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
    setNotification('Task deleted successfully');
    setTimeout(() => setNotification(''), 3000);
  }, []);

  const handleToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: id });
  }, []);

  const handleToggleEdit = useCallback((id) => {
    dispatch({ type: 'TOGGLE_EDIT', payload: id });
  }, []);

  const handleEditTask = useCallback((id, text) => {
    dispatch({ type: 'EDIT_TASK', payload: { id, text } });
    setNotification('Task updated successfully');
    setTimeout(() => setNotification(''), 3000);
  }, []);

  const handleAddTask = useCallback((task) => {
    dispatch({ type: 'ADD_TASK', payload: task });
    setNotification('Task added successfully');
    setTimeout(() => setNotification(''), 3000);
  }, []);

  return (
    <ThemeProvider>
      <div className="container">
        <h1>Task Manager</h1>
        <ThemeToggle />
        <Notification message={notification} />
        <TaskForm dispatch={handleAddTask} />
        <TaskFilter filter={filter} setFilter={setFilter} />
        <TaskList tasks={filteredTasks} onDelete={handleDelete} onToggle={handleToggle} onToggleEdit={handleToggleEdit} onEditTask={handleEditTask} />
        <h3>Completed Tasks: {tasks.filter(task => task.completed).length}</h3>
      </div>
    </ThemeProvider>
  );
}