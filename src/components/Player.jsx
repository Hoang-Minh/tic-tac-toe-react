import React from "react";
import { useState } from "react";

function Player({initalName, symbol, isActive}) {

    const [playerName, setPlayerName] = useState(initalName);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (event) => {
        setPlayerName(event.target.value);
    }

    const handleEditClick = () => setIsEditing((isEditing) => !isEditing); //TODO: this is important. Use it when needs to update the old state

    let editablePlayerName = <span className="player-name">{playerName}</span>;

    if(isEditing) {

        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}></input>;
    }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}

export default Player;
