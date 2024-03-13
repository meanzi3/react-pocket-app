import React, { useState } from "react";

const List = ({
  id,
  title,
  amount,
  pocketData,
  setPocketData,
  provided,
  snapshot,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedAmount, setEditedAmount] = useState(amount);

  const handleClick = (id) => {
    let newPocketData = pocketData.filter((data) => data.id !== id);
    setPocketData(newPocketData);
    localStorage.setItem("pocketData", JSON.stringify(newPocketData));
  };

  const handleEditChange = (e) => {
    if (e.target.name === "title") {
      setEditedTitle(e.target.value);
    } else if (e.target.name === "amount") {
      setEditedAmount(e.target.value);
    }
  };

  const handleSubmit = () => {
    let newPocketData = pocketData.map((data) => {
      if (data.id === id) {
        data.title = editedTitle;
        data.amount = editedAmount;
      }
      return data;
    });
    setPocketData(newPocketData);
    localStorage.setItem("pocketData", JSON.stringify(newPocketData));
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center justify-between w-full px-4 py-1 my-1 text-gray-600 bg-gray-100 border rounded row">
        <form onSubmit={handleSubmit} className="flex items-center w-full">
          <input
            className="w-full px-3 py-2 mr-4 text-gray-500 appearance-none"
            name="title"
            value={editedTitle}
            onChange={handleEditChange}
            autoFocus
          />
          <input
            className="w-full px-3 py-2 mr-4 text-gray-500 appearance-none"
            name="amount"
            type="number"
            value={editedAmount}
            onChange={handleEditChange}
          />
        </form>
        <div className="flex">
          <button
            onClick={handleSubmit}
            class="px-4 py-2 float-right"
            type="submit"
          >
            save
          </button>
          <button
            class="px-4 py-2 float-right"
            onClick={() => setIsEditing(false)}
            type="button"
          >
            x
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        key={id}
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        className={`${
          snapshot.isDragging ? "bg-gray-100" : "bg-white"
        } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded transition-all duration-300 hover:scale-105`}
      >
        <div className="flex items-center w-full">
          <div className="w-full px-3 py-2 mr-4">
            <span>{title}</span>
          </div>
          <div className="w-full px-3 py-2 mr-4">
            <span>{amount}</span>
          </div>
          <div className="flex">
            <button className="px-4 py-2" onClick={() => setIsEditing(true)}>
              edit
            </button>
            <button className="px-4 py-2" onClick={() => handleClick(id)}>
              x
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default List;
