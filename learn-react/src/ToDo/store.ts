import { action, computed, makeAutoObservable, observable } from "mobx";
import Firebase from "./Firebase";
import { User } from "firebase/auth";
import { PSUser, Todo } from "./List";
// import { ref, onValue, set } from "firebase/database";
// import { firebase } from "../App";

export interface Item {
  id: number;
  userId: string;
  text: string;
  isDone: boolean;
}

export class Store {
  @observable list: Todo[] = [];
  @observable isLoading = true;
  constructor(user: PSUser) {
    makeAutoObservable(this);
    this.setTodos(user.todos || []);
    this.isLoading = false;
  }

  @computed
  get todos() {
    return this.list;
  }
  @action
  setTodos(todos: Todo[]) {
    this.list = todos;
  }
  @action
  addTodo = (title: string, userId: string) => {
    console.log("User ID: ", userId);
    const item = {
      id: Date.now().toString(),
      title: title,
      is_complete: false,
      userId: userId,
      created_at: Date.now().toString(),
      updated_at: Date.now().toString(),
    };
    this.list.push(item);
    // this.firebase.setDbItemValue(item);
  };

  @action
  removeTodo = (todo: Todo) => {
    const index = this.list.indexOf(todo);
    if (index !== -1) {
      this.list.splice(index, 1);
    }
    // this.firebase.removeItemValue(todo);
  };

  @action
  removeList = () => {
    this.list = [];
    // this.firebase.clearDb();
  };

  @action
  toggleTodo = (todoId: string) => {
    const todo = this.list.find((todo) => todo.id === todoId);
    if (todo) {
      todo.is_complete = !todo.is_complete;
      //   this.firebase.updateItemValue(todo);
    }
  };

  @computed
  get finishedTodos(): Todo[] {
    return this.list.filter((todo) => todo.is_complete);
  }

  @computed
  get openTodos(): Todo[] {
    return this.list.filter((todo) => !todo.is_complete);
  }
}

export default Store;
