import React from "react";

function TaskListHeader() {

  const ArticleLength = localStorage.getItem('dataLength');

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
      <div>
        <h1 className="text-2xl font-bold">My Task</h1>
        <div className="flex gap-4 mt-2">
          <span className="text-sm">Article {ArticleLength || '0'}</span>
        </div>
      </div>
      <div className="text-sm text-gray-500 mt-2 md:mt-0">
        Last Sync: {new Date().toLocaleString()}
      </div>
    </div>
  );
}

export default TaskListHeader;
