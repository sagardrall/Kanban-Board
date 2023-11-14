// KanbanApp.js
import React, { useState, useEffect } from 'react';
import KanbanBoard from './KanbanBoard';
import './KanbanApp.css';

const KanbanApp = () => {
  const [tickets, setTickets] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    status: 'Todo',
    userId: '',
    priority: 0,
  });
  const [showForm, setShowForm] = useState(false);
  const [groupBy, setGroupBy] = useState('status');
  const [sortOrder, setSortOrder] = useState('priority');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();

        if (data && Array.isArray(data.tickets)) {
          setTickets(data.tickets);
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const savedGroupBy = localStorage.getItem('kanbanGroupBy');
    const savedSortOrder = localStorage.getItem('kanbanSortOrder');

    if (savedGroupBy) {
      setGroupBy(savedGroupBy);
    }

    if (savedSortOrder) {
      setSortOrder(savedSortOrder);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setTickets((prevTickets) => [
      ...prevTickets,
      { ...newTask, id: `CAM-${prevTickets.length + 1}` },
    ]);
    setNewTask({ title: '', status: 'Todo', userId: '', priority: 0 });
    setShowForm(false);
  };

  const handleGroupByChange = (selectedGroupBy) => {
    setGroupBy(selectedGroupBy);
    localStorage.setItem('kanbanGroupBy', selectedGroupBy);
  };

  const handleSortOrderChange = (selectedSortOrder) => {
    setSortOrder(selectedSortOrder);
    localStorage.setItem('kanbanSortOrder', selectedSortOrder);
  };

  return (
    <div className="kanban-app">
      <div className="kanban-header">
        
        <div>
          <label htmlFor="groupBy">Group By:</label>
          <select
            id="groupBy"
            onChange={(e) => handleGroupByChange(e.target.value)}
            value={groupBy}
          >
            <option value="status">By Status</option>
            <option value="userId">By User</option>
            <option value="priority">By Priority</option>
          </select>
          <label htmlFor="sortOrder">Sort Order:</label>
          <select
            id="sortOrder"
            onChange={(e) => handleSortOrderChange(e.target.value)}
            value={sortOrder}
          >
            <option value="priority">By Priority</option>
            <option value="title">By Title</option>
          </select>
        </div>
      </div>
     
      
      <KanbanBoard tickets={tickets} groupBy={groupBy} sortOrder={sortOrder} />
    </div>
  );
};

export default KanbanApp;
