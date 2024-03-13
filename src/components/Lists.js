import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from "./List";

export default function Lists({ pocketData, setPocketData }) {
  const handleEnd = (result) => {
    if (!result.destination) return;

    const newPocketData = pocketData.slice(); // 새로운 배열 생성

    const [reorderedItem] = newPocketData.splice(result.source.index, 1);
    newPocketData.splice(result.destination.index, 0, reorderedItem);
    setPocketData(newPocketData);
    localStorage.setItem("pocketData", JSON.stringify(newPocketData));
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="pockets">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {pocketData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      amount={data.amount}
                      pocketData={pocketData}
                      setPocketData={setPocketData}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
