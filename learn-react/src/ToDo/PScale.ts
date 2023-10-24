import { toJS } from "mobx";
import { Todo } from "./List";
import { useAuth } from "../Context/AuthContext";
const local_domain = process.env.REACT_APP_NEXT_PUBLIC_TODO_API_URL;
const prod_domain = process.env.REACT_APP_API_URL;
export const api_domain = local_domain ? local_domain : prod_domain;

export async function toggleTodo(todo: Todo, accessToken: string) {
  validateTodoProperties("toggleTodo", todo);
  try {
    const url = `${api_domain}/api/route?id=${todo.id}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("PScale.toggle.res: ", res);
  } catch (error) {
    throw Error(`PScale.toggle.error: ${error}`);
  }
}
export async function deleteTodo(todo: Todo, accessToken: string) {
  validateTodoProperties("deleteTodo", todo);

  try {
    const url = `${api_domain}/api/route?id=${todo.id}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("PScale.deleteTodo.res: ", res);
  } catch (error) {
    throw Error(`PScale.deleteTodo.error: ${error}`);
  }
}
export async function createTodo(todo: Todo, accessToken: string) {
  validateTodoProperties("createTodo", todo);

  try {
    const url = `${api_domain}/api/route?id=${todo.id}&title=${todo.title}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("PScale.createTodo.res: ", res);
  } catch (error) {
    throw Error(`PScale.createTodo.error: ${error}`);
  }
}
export async function deleteAllTodos(accessToken: string) {
  try {
    const url = `${api_domain}/api/route`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("PScale.deleteAllTodos.res: ", res);
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
