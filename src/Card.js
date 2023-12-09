import React from "react";
import featureIcon from "./featureIcon.png";
import circleIcon from "./circle1.png";
import "./Card.css";

const getRandomStatus = () => {
  const statuses = ["Online", "Away", "Offline"];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
};

const Card = ({ ticket, groupingOption }) => {
  console.log(ticket);
  let profilePicPath;
  const numericUserId = ticket.userId.replace(/\D/g, "");
  profilePicPath = `./profile-pics/pic${numericUserId}.jpg`;

  const onlineStatus = getRandomStatus();
  if (groupingOption === "status") {
    return (
      <div className="card">
        <div className="first">
          <div className="profile-info">
            <img
              src={profilePicPath}
              alt="profile-pic"
              className="profile-pic"
            />
            <div className={`online-status ${onlineStatus.toLowerCase()}`} />
          </div>
          <div className="ticket-id">{ticket.id}</div>
          <div className="card-title">{ticket.title}</div>
        </div>
        <div className="card-body">
          <span className="icon-button">
            <img src={featureIcon} alt="feature-icon" className="icon" />
          </span>
          <span className="icon-text-button">
            <span>
              <img src={circleIcon} alt="circleIcon" className="icon" />
            </span>
            <span className="feature-text">{ticket?.tag?.join(", ")}</span>
          </span>
        </div>
      </div>
    );
  }
  else
  {
    let statusIcon;
    let status_ = ticket.status;
    if(status_ === "In progress"){
      status_ = "InProgress";
    }
    statusIcon = `./status/${status_}.png`;
    return (
      <div className="card">
        <div className="first">
          <div className="profile-info">
            <img src={profilePicPath} alt="profile-pic" className="profile-pic" />
            <div className={`online-status ${onlineStatus.toLowerCase()}`} />
          </div>
          <div className="ticket-id">{ticket.id}</div>
          <div className="card-title">
          <span>
              <img
                
                style={{ width: "11px", height: "11px", paddingRight: "3px" }}
                src={`${process.env.PUBLIC_URL}/${statusIcon}`}
              ></img>
            </span>{ticket.title}</div>
        </div>
        <div className="card-body">
          <span className="icon-button">
            <img src={featureIcon} alt="feature-icon" className="icon" />
          </span>
          <span className="icon-text-button">
            <span>
              <img src={circleIcon} alt="circleIcon" className="icon" />
            </span>
            <span className="feature-text">{ticket?.tag?.join(", ")}</span>
          </span>
        </div>
      </div>
    );
  }
};

export default Card;
