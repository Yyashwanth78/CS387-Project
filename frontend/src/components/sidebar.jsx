import React, { useState } from 'react';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleSidebar() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className="sidebar">
      <button onClick={toggleSidebar}>
        {isExpanded ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>
      {isExpanded && (
        <div className="sidebar-content">
          <button>Button 1</button>
          <button>Button 2</button>
          <button>Button 3</button>
        </div>
      )}
      <style jsx>{`
        .sidebar {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: ${isExpanded ? '200px' : '50px'};
          transition: width 0.3s;
          background-color: #f0f0f0;
          overflow: hidden;
        }
        .sidebar button {
          display: block;
          width: 100%;
          padding: 10px;
          border: none;
          background-color: #fff;
          font-size: 14px;
          text-align: left;
        }
        .sidebar-content {
          padding: 10px;
        }
      `}</style>
    </div>
  );
}
