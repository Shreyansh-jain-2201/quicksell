// Column.js
import React from "react";
import Card from "./Card";
import plus from "./add-plus.png";
import dots from "./dots.png";
import "./Column.css";

function generateUserProfilePicMap(users) {
  const userProfilePicMap = {};
  const defaultProfilePicPath = "srcprofile-picspic0.jpg";

  for (let i = 1; i < Math.min(users.length, 10); i++) {
    const user = users[i - 1];
    const profilePicPath = defaultProfilePicPath;

    let path = "srcprofile-picspic" + i + ".jpg";
    userProfilePicMap[user.id] = path;
  }
  // console.log("userProfilePicMap",userProfilePicMap)
  return userProfilePicMap;
}

const Column = ({ title, tickets, groupingOption }) => {
  let profilePicPath;
  if (groupingOption === "user") {
    const numericUserId = tickets[0].userId.replace(/\D/g, "");
    profilePicPath = `./profile-pics/pic${numericUserId}.jpg`;

    return (
      <div className="column">
        <h4
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>
            {groupingOption === "user" && (
              <span>
                <img
                  className="column-img"
                  src={`${process.env.PUBLIC_URL}/${profilePicPath}`}
                ></img>
              </span>
            )}{" "}
            {title}{" "}
            <span style={{ color: "#acb1b4", marginLeft: "5px" }}>
              {tickets.length}
            </span>
          </span>
          <span>
            <span>
              <img className="column-img plus" src={plus}></img>
            </span>
            <span>
              <img className="column-img" src={dots}></img>
            </span>
          </span>
        </h4>

        {tickets.map((ticket) => (
          <Card key={ticket.id} ticket={ticket} />
        ))}
      </div>
    );
  }
  if (groupingOption === "priority") {
    let priorityIcon;
    let priority_ = tickets[0].priority;
    if (priority_ === 4) {
      priority_ = "Urgent";
    }
    if (priority_ === 3) {
      priority_ = "High";
    }
    if (priority_ === 2) {
      priority_ = "Medium";
    }
    if (priority_ === 1) {
      priority_ = "Low";
    }
    if (priority_ === 0) {
      priority_ = "No priority";
    }
    priorityIcon = `./priorities/priority${tickets[0].priority}.png`;
    return (
      <div className="column">
        <h4>
          <span>
            <span>
              <img
                className="column-img"
                src={`${process.env.PUBLIC_URL}/${priorityIcon}`}
              ></img>
            </span>
            {priority_}{" "}
            <span style={{ color: "#acb1b4", marginLeft: "10px" }}>
              {tickets.length}
            </span>
          </span>
          <span>
            <span>
              <img className="column-img plus"
                src={plus}
              ></img>
            </span>
            <span>
              <img className="column-img"
                src={dots}
              ></img>
            </span>
          </span>
        </h4>

        {tickets.map((ticket) => (
          <Card key={ticket.id} ticket={ticket} />
        ))}
      </div>
    );
  }
  if (groupingOption === "status") {
    let statusIcon;
    let status_ = tickets[0].status;
    if(status_ === "In Progress"){
      status_ = "InProgress";
    }
    statusIcon = `./status/${status_}.png`;
    return (
      <div className="column">
        <h4>
          <span>
            <span>
              <img
                className="column-img"
                src={`${process.env.PUBLIC_URL}/${statusIcon}`}
              ></img>
            </span>
            {tickets[0].status}{" "}
            <span style={{ color: "#acb1b4", marginLeft: "10px" }}>
              {tickets.length}
            </span>
          </span>
          <span>
            <span>
              <img className="column-img plus" src={plus}></img>
            </span>
            <span>
              <img className="column-img" src={dots}></img>
            </span>
          </span>
        </h4>

        {tickets.map((ticket) => (
          <Card key={ticket.id} ticket={ticket} />
        ))}
      </div>
    );
  }
};

export default Column;
