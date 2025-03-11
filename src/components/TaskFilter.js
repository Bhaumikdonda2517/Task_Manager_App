import React from 'react';

const TaskFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="ALL">All Tasks</option>
        <option value="COMPLETED">Completed Tasks</option>
        <option value="INCOMPLETE">Incomplete Tasks</option>
      </select>
    </div>
  );
};

export default TaskFilter;