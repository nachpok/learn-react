import { action, computed, observable } from "mobx";
// import Item from "./Item";

export interface Item {
  id: number;
  text: string;
  isDone: boolean;
}

export class TodoList {
  @observable list: Item[] = [];

  constructor() {}

  @action
  addTodo = (text: string) => {
    const item = { id: Date.now(), text: text, isDone: false };
    this.list.push(item);
  };

  @action
  removeTodo = (todo: Item) => {
    const index = this.list.indexOf(todo);
    if (index !== -1) {
      this.list.splice(index, 1);
    }
  };
  @action
  removeList = () => {
    this.list = [];
  };

  @action
  toggleTodo = (todoId: number) => {
    const todo = this.list.find((todo) => todo.id === todoId);
    if (todo) {
      todo.isDone = !todo.isDone;
    }
  };

  @computed
  get finishedTodos(): Item[] {
    return this.list.filter((todo) => todo.isDone);
  }

  @computed
  get openTodos(): Item[] {
    return this.list.filter((todo) => !todo.isDone);
  }
}

// const store = new TodoList();
// export default store;
