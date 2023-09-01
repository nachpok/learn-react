import React from "react";
import { Item } from "./List";

export interface ListItemProps {
  item: Item;
  handleChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemove: () => void;
}

function ListItem({ item, handleChecked, handleRemove }: ListItemProps) {
  const value = item.checked ? <s>{item.value}</s> : <span>{item.value}</span>;
  return (
    <div key={item.id} className="listItem">
      <div>
        <input
          type="checkbox"
          checked={item.checked}
          onChange={handleChecked}
        ></input>
        {value}
      </div>
      <button onClick={handleRemove}>x</button>
    </div>
  );
}

export default ListItem;
