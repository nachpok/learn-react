import { action, computed, makeAutoObservable, observable } from "mobx";
import { database } from "../firebase";
import { ref, onValue, set } from "firebase/database";

export interface Item {
  id: number;
  text: string;
  isDone: boolean;
}

export class TodoStore {
  @observable list: Item[] = [];
  @observable isLoading = true;

  constructor() {
    makeAutoObservable(this);
    const todosRef = ref(database, "todos");
    onValue(todosRef, (snapshot) => {
      this.setTodos(snapshot.val() || []);
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
    set(ref(database, "todos"), this.list);
  };

  @action
  removeTodo = (todo: Item) => {
    const index = this.list.indexOf(todo);
    if (index !== -1) {
      this.list.splice(index, 1);
    }
    set(ref(database, "todos"), this.list);
  };
  @action
  removeList = () => {
    this.list = [];
    set(ref(database, "todos"), this.list);
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

const store = new TodoStore();
export default store;
