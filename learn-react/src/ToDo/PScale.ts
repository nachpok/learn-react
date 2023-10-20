import { toJS } from "mobx";
import { Todo } from "./List";
import { useAuth } from "../Context/AuthContext";
export const api_domain =
  process.env.REACT_APP_NEXT_PUBLIC_TODO_API_URL ||
  process.env.NEXT_PUBLIC_TODO_API_URL;
const { currentUser } = useAuth();
export async function toggleTodo(todo: Todo) {
  console.log("PScale.toggleTodo.todo: ", toJS(todo));

  try {
    const res = await fetch(
      `https://todo-api-juzg.vercel.app/api/todos/${currentUser.userId}/${todo.id}/toggle`
    );
    console.log("PScale.toggle.res: ", res);
  } catch (error) {
    throw Error(`${error}`);
  }
}
export async function deleteTodo(todo: Todo) {
  if (todo.userId && todo.id) {
    const res = await fetch(
      `${api_domain}/api/todos/${todo.userId}/${todo.id}/deleteTodo`
    );
  } else {
    throw Error(`Missing data,can't delete todo: ${JSON.stringify(todo)}`);
  }
}
export async function createTodo(todo: Todo) {
  if (todo.userId && todo.id && todo.title) {
    const res = await fetch(
      `${api_domain}/api/todos/${todo.userId}/${todo.id}/${todo.title}/createTodo`
    );
  } else {
    throw Error(`Missing data,can't create todo: ${JSON.stringify(todo)}`);
  }
}
export async function deleteAllTodos(userId: string) {
  if (userId) {
    const res = await fetch(`${api_domain}/api/todos/${userId}/deleteTodos`);
  } else {
    throw Error(`Missing data,can't delete all todos of userId: ${userId}`);
  }
}
