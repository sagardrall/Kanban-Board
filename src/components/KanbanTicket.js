import React from 'react';

import './KanbanTicket.css'; 


const KanbanTicket = ({ ticket }) => {
  const { id, title, status, user, priority } = ticket;

  return (
    <div className="kanban-ticket">
      <div className="ticket-content">
        <h3>{title}</h3>
        <p>
          
          Status: {status} | User: {user} | Priority: {priority}
        </p>
      </div>
      
    </div>
  );
};

export default KanbanTicket;
