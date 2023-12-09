// Board.js
import React from 'react';
import Column from './Column';

const Board = ({ tickets, groupingOption, sortOption }) => {
    console.log(tickets)

  function groupTicketsByUser(tickets, users) {
    if (!tickets || tickets.length === 0 || !users || users.length === 0) {
      console.log("No tickets or users provided");
      return {};
    }
  
    const userMap = {};
    users.forEach((user) => {
      userMap[user.id] = user.name || 'Unassigned';
    });
  
    const groupedByUser = {};
  
    tickets.forEach((ticket) => {
      const user = ticket.userId || 'Unassigned';
      const userName = userMap[user];
  
      if (!groupedByUser[userName]) {
        groupedByUser[userName] = [];
      }
  
      groupedByUser[userName].push(ticket);
    });
  
    return groupedByUser;
  }

  const groupTickets = () => {
    if (groupingOption === 'status') {
      // Group by Status
      const groupedByStatus = {};
      tickets?.tickets?.forEach(ticket => {
        const status = ticket.status;
        if (!groupedByStatus[status]) {
          groupedByStatus[status] = [];
        }
        groupedByStatus[status].push(ticket);
      });
      return groupedByStatus;
    } else if (groupingOption === 'user') {
      const groupedByUser = groupTicketsByUser(tickets?.tickets, tickets?.users);
      return groupedByUser;
    } else if (groupingOption === 'priority') {
      // Group by Priority
      const groupedByPriority = {};
      tickets?.tickets?.forEach(ticket => {
        const priority = ticket.priority;
        if (!groupedByPriority[priority]) {
          groupedByPriority[priority] = [];
        }
        groupedByPriority[priority].push(ticket);
      });
      return groupedByPriority;
    }
  };

  // Function to sort tickets based on the selected option
  const sortTickets = groupedTickets => {
    const sortedTickets = {};
    Object.keys(groupedTickets).forEach(group => {
      const ticketsInGroup = groupedTickets[group];
      sortedTickets[group] = ticketsInGroup.sort((a, b) => {
        if (sortOption === 'priority') {
          return b.priority - a.priority;
        } else if (sortOption === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    });
    return sortedTickets;
  };

  const groupedTickets = groupTickets();
  const sortedTickets = sortTickets(groupedTickets);
  console.log(sortedTickets)
  return (
    <div className="board">
      {Object.keys(sortedTickets).map(group => (
        <Column key={group} title={group} tickets={sortedTickets[group]} groupingOption={groupingOption}/>
      ))}
    </div>
  );
};

export default Board;
