import { toJS } from "mobx";
import { Todo } from "./List";
const local_domain = process.env.REACT_APP_NEXT_PUBLIC_TODO_API_URL;
const prod_domain = process.env.NEXT_PUBLIC_TODO_API_URL;
export const api_domain = local_domain ? local_domain : prod_domain;

export async function toggleTodo(todo: Todo) {
  console.log("api_domain: ", api_domain);
  validateTodoProperties("toggleTodo", todo);
  try {
    const url = `${api_domain}/api/todos/${todo.userId}/${todo.id}/toggle`;
    console.log("PScale.toggle.url: ", url);
    const res = await fetch(url);
    console.log("PScale.toggle.res: ", res);
  } catch (error) {
    throw Error(`PScale.toggle.error: ${error}`);
  }
}
export async function deleteTodo(todo: Todo) {
  validateTodoProperties("deleteTodo", todo);

  try {
    const url = `${api_domain}/api/todos/${todo.userId}/${todo.id}/deleteTodo`;
    const res = await fetch(url);
    console.log("PScale.deleteTodo.res: ", res);
  } catch (error) {
    throw Error(`PScale.deleteTodo.error: ${error}`);
  }
}
export async function createTodo(todo: Todo) {
  validateTodoProperties("createTodo", todo);

  try {
    const url = `${api_domain}/api/todos/${todo.userId}/${todo.id}/${todo.title}/createTodo`;
    const res = await fetch(url);
    console.log("PScale.createTodo.res: ", res);
  } catch (error) {
    throw Error(`PScale.createTodo.error: ${error}`);
  }
}
export async function deleteAllTodos(userId: string) {
  try {
    const url = `${api_domain}/api/todos/${userId}/deleteTodos`;
    const res = await fetch(url);
    console.log("PScale.deleteAllTodos.res: ", res);
  } catch (error) {
    throw Error(`PScale.deleteAllTodos.error: ${error}`);
  }
}

function validateTodoProperties(method: string, todo: Partial<Todo>): void {
  const keys = Object.keys(todo) as Array<keyof Todo>;
  for (const key of keys) {
    if (todo[key] === undefined) {
      throw new Error(`PScale.${method} - Property "${key}" is undefined.`);
    }
  }
}
