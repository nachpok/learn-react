import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Item } from "./ToDoStore";
export interface ListItemProps {
  item: Item;
  toggle: (itemId: number) => void;
  remove: (item: Item) => void;
}
function ListItem({ item, toggle, remove: remove }: ListItemProps) {
  const value = item.isDone ? <s>{item.text}</s> : <span>{item.text}</span>;

  const handleChange = () => {
    toggle(item.id);
  };
  const handleRemove = () => {
    remove(item);
  };

  return (
    <div key={item.id} className="listItem">
      <div>
        <input
          key={item.id}
          type="checkbox"
          checked={item.isDone}
          onChange={handleChange}
        ></input>
        {value}
      </div>
      <button onClick={() => handleRemove()}>x</button>
    </div>
  );
}

export default observer(ListItem);
