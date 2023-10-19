import { observer } from "mobx-react";
import { Todo } from "./List";
export interface ListItemProps {
  todo: Todo;
  toggle: (itemId: string) => void;
  remove: (item: Todo) => void;
}
function ListItem({ todo, toggle, remove }: ListItemProps) {
  const value = todo.is_complete ? (
    <s>{todo.title}</s>
  ) : (
    <span>{todo.title}</span>
  );

  const handleChange = () => {
    toggle(todo.id);
  };
  const handleRemove = () => {
    remove(todo);
  };

  return (
    <div key={todo.id} className="listItem">
      <div>
        <input
          key={todo.id}
          type="checkbox"
          checked={todo.is_complete}
          onChange={handleChange}
        ></input>
        {value}
      </div>
      <button onClick={() => handleRemove()}>x</button>
    </div>
  );
}

export default observer(ListItem);
