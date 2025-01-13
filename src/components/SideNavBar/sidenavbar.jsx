import React, { useState } from 'react';
import { ClipboardList, History, FileSpreadsheet, AlertCircle, BookOpen, Settings, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ isMenuOpen }) {
  const [activeItem, setActiveItem] = useState('my-task');

  const navigate = useNavigate();


  const handleClickNavigation = (path) => {
    navigate("/");
    setActiveItem(path);
  }

  const navItems = [
    {
      id: 'my-task',
      title: 'My Task',
      icon: <ClipboardList className="w-5 h-5" />
    },
    {
      id: 'task-history',
      title: 'My Task History',
      icon: <History className="w-5 h-5" />
    },
    {
      id: 'task-assignment',
      title: 'Task Assignment',
      icon: <FileSpreadsheet className="w-5 h-5" />
    },
    {
      id: 'issue-overview',
      title: 'Issue Overview',
      icon: <AlertCircle className="w-5 h-5" />
    },
    {
      id: 'journal-overview',
      title: 'Journal Overview',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Settings className="w-5 h-5" />
    }
  ];

  return (
    <div className={`h-[91.5vh] bg-white shadow-lg transition-all duration-300 ${isMenuOpen ? 'w-64' : 'w-20'}`}>   

      {/* Navigation Items */}
      <nav className="mt-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClickNavigation(item.id)}
            className={`w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors
              ${activeItem === item.id ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : ''}`}
          >
            <span className="inline-flex items-center justify-center">
              {item.icon}
            </span>
            {isMenuOpen && (
              <span className="ml-3 text-sm font-medium">
                {item.title}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}

