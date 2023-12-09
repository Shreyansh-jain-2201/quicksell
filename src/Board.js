// Board.js
import React from 'react';
import Column from './Column';

const Board = ({ tickets, groupingOption, sortOption }) => {
    console.log(tickets)

  function groupTicketsByUser(tickets, users) {
    // Check if tickets and users are defined and not empty
    if (!tickets || tickets.length === 0 || !users || users.length === 0) {
      console.log("No tickets or users provided");
      return {};
    }
  
    // Create a user map for quick lookup
    const userMap = {};
    users.forEach((user) => {
      userMap[user.id] = user.name || 'Unassigned';
    });
  
    // Group by User
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
  
  // function generateUserProfilePicMap(users) {
    // const userProfilePicMap = {};
    // const defaultProfilePicPath = "src\profile-pics\pic(1).jpg";
  
    // for (let i = 0; i < Math.min(users.length, 10); i++) {
    //   const user = users[i];
    //   const profilePicPath = defaultProfilePicPath;
  
    //   switch (user.id) {
    //     case "usr-1":
    //       userProfilePicMap["usr-1"] = "src\profile-pics\pic(2).jpg";
    //       break;
    //     case "usr-2":
    //       userProfilePicMap["usr-2"] = "src\profile-pics\pic(3).jpg";
    //       break;
    //     case "usr-3":
    //       userProfilePicMap["usr-3"] = "src\profile-pics\pic(4).jpg";
    //       break;
    //     case "usr-4":
    //       userProfilePicMap["usr-4"] = "src\profile-pics\pic(5).jpg";
    //       break;
    //     case "usr-5":
    //       userProfilePicMap["usr-5"] = "src\profile-pics\pic(6).jpg";
    //       break;
    //     case "usr-6":
    //       userProfilePicMap["usr-6"] = "src\profile-pics\pic(7).jpg";
    //       break;
    //     case "usr-7":
    //       userProfilePicMap["usr-7"] = "src\profile-pics\pic(8).jpg";
    //       break;
    //     case "usr-8":
    //       userProfilePicMap["usr-8"] = "src\profile-pics\pic(9).jpg";
    //       break;
    //     case "usr-9":
    //       userProfilePicMap["usr-9"] = "src\profile-pics\pic(10).jpg";
    //       break;
    //     case "usr-10":
    //       userProfilePicMap["usr-10"] = "src\profile-pics\pic(11).jpg";
    //       break;
    //     default:
    //       userProfilePicMap[user.id] = defaultProfilePicPath;
    //       break;
    //   }
    // }
  
  //   return userProfilePicMap;
  // }
 

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
