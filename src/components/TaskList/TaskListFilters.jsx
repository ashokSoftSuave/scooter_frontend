import React from 'react';

function TaskListFilters({ filters, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm">Sort by:</span>
        <select
          className="border rounded-lg px-3 py-2"
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value })}
        >
          <option value="dueDate">Due date</option>
          <option value="ptsId">PTS ID</option>
          <option value="articleType">Article Type</option>
        </select>
      </div>
      <select
        className="border rounded-lg px-3 py-2"
        value={filters.volume}
        onChange={(e) => onFilterChange({ volume: e.target.value })}
      >
        <option value="all">Vol/Iss: All</option>
        <option value="12/4">12/4</option>
        <option value="12/3">12/3</option>
      </select>
      <select
        className="border rounded-lg px-3 py-2"
        value={filters.journal}
        onChange={(e) => onFilterChange({ journal: e.target.value })}
      >
        <option value="all">Journal: All</option>
        <option value="jar">Journal of Advanced Research</option>
        <option value="jcr">Journal of Clinical Research</option>
      </select>
    </div>
  );
}

export default TaskListFilters;

