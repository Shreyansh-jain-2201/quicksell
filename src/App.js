import React, { useState, useEffect } from "react";
import Board from "./Board";
import "./App.css";
import axios from "axios";
import displayLogo from "./displayLogo1.png";

const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [pdrop, setpdrop] = React.useState(false);
  const [groupingOption, setGroupingOption] = useState("status");
  const [sortOption, setSortOption] = useState("priority");

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setTickets(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleGroupingChange = (option) => {
    setGroupingOption(option);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="app">
      <header>
        <div className="display">
          <button
            className="display-button"
            onClick={() => {
              setpdrop(!pdrop);
            }}
          >
          <span><img src={displayLogo} alt="logo" className="display-logo" /></span>
            Display
          </button>
          {pdrop && (
            <div className="options dropdown">
              <label className="menu-item">
                <span className="labels">Grouping:</span>
                <select
                  className="button-drop"
                  value={groupingOption}
                  onChange={(e) => handleGroupingChange(e.target.value)}
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </label>
              <label className="menu-item">
                <span className="labels">Ordering:</span>
                <select
                  className="button-drop"
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </label>
            </div>
          )}
        </div>
      </header>
      <main>
        {tickets && (
          <Board
            tickets={tickets}
            groupingOption={groupingOption}
            sortOption={sortOption}
          />
        )}
      </main>
    </div>
  );
};

export default App;
