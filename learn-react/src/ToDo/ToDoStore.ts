import { action, computed, makeAutoObservable, observable } from "mobx";
import Firebase from "./Firebase";
// import { ref, onValue, set } from "firebase/database";
// import { firebase } from "../App";

export interface Item {
  id: number;
  userId: string;
  text: string;
  isDone: boolean;
}

export class TodoStore {
  @observable list: Item[] = [];
  @observable isLoading = true;
  firebase: Firebase;
  constructor(firebase: Firebase) {
    makeAutoObservable(this);
    this.firebase = firebase;

    firebase.onDbValue((snapshot: any) => {
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
  addTodo = (text: string, userId: string) => {
    console.log("User ID: ", userId);
    const item = { id: Date.now(), text: text, isDone: false, userId: userId };
    this.list.push(item);
    this.firebase.setDbItemValue(item);
  };

  @action
  removeTodo = (todo: Item) => {
    const index = this.list.indexOf(todo);
    if (index !== -1) {
      this.list.splice(index, 1);
    }
    this.firebase.removeItemValue(todo);
  };

  @action
  removeList = () => {
    this.list = [];
    this.firebase.clearDb();
  };

  @action
  toggleTodo = (todoId: number) => {
    const todo = this.list.find((todo) => todo.id === todoId);
    if (todo) {
      todo.isDone = !todo.isDone;
      this.firebase.updateItemValue(todo);
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

export default TodoStore;
