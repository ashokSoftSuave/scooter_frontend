import React, { useState } from "react";
import { Search } from "lucide-react";
import TaskListHeader from "./TaskListHeader";
import TaskListTable from "./TaskListTable";
import TaskListFilters from "./TaskListFilters";

function TaskList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    sortBy: "dueDate",
    volume: "all",
    journal: "all",
  });

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <div className="container mx-auto p-4">
      <TaskListHeader />
      <div className="flex flex-col md:flex-row justify-between items-center my-4">
        <div className="relative w-full md:w-64 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search Author"
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <TaskListFilters
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>
      <TaskListTable searchQuery={searchQuery} filters={filters} />
    </div>
  );
}

export default TaskList;
