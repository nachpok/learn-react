import { action, computed, makeAutoObservable, observable } from "mobx";
// import { ref, onValue, set } from "firebase/database";
import Firebase from "../Firebase";

export interface Item {
  id: number;
  text: string;
  isDone: boolean;
}
export const firebase = new Firebase("todos");
export class TodoStore {
  @observable list: Item[] = [];
  @observable isLoading = true;

  constructor() {
    makeAutoObservable(this);

    firebase.onDbValue((snapshot) => {
      if (snapshot.exists()) {
        const list = Object.values(snapshot.val()) as Item[];
        this.setTodos(list || []);
      }
    });

    this.isLoading = false;
  }

  @computed
  get todos() {
    return this.list;
  }
  @action
  setTodos(todos: Item[]) {
    this.list = todos;
  }
  @action
  addTodo = (text: string) => {
    const item = { id: Date.now(), text: text, isDone: false };
    this.list.push(item);
    firebase.setDbItemValue(item);
  };

  @action
  removeTodo = (todo: Item) => {
    const index = this.list.indexOf(todo);
    if (index !== -1) {
      this.list.splice(index, 1);
    }
    firebase.removeItemValue(todo);
  };

  @action
  removeList = () => {
    this.list = [];
    firebase.clearDb();
  };

  @action
  toggleTodo = (todoId: number) => {
    const todo = this.list.find((todo) => todo.id === todoId);
    if (todo) {
      todo.isDone = !todo.isDone;
      firebase.updateItemValue(todo);
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

const store = new TodoStore();
export default store;
