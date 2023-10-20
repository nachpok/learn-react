import { Todo } from "./List";
export const api_domain =
  process.env.REACT_APP_NEXT_PUBLIC_TODO_API_URL ||
  process.env.NEXT_PUBLIC_TODO_API_URL;
// const domain = "  http://localhost:3000";
export async function toggleTodo(todo: Todo) {
  if (todo.userId && todo.id) {
    const res = await fetch(
      `${api_domain}/api/todos/${todo.userId}/${todo.id}/toggle`,
      {
        mode: "no-cors",
      }
    );
  } else {
    throw Error(`Missing data,can't toggle todo: ${JSON.stringify(todo)}`);
  }
}
export async function deleteTodo(todo: Todo) {
  if (todo.userId && todo.id) {
    const res = await fetch(
      `${api_domain}/api/todos/${todo.userId}/${todo.id}/deleteTodo`,
      {
        mode: "no-cors",
      }
    );
  } else {
    throw Error(`Missing data,can't delete todo: ${JSON.stringify(todo)}`);
  }
}
export async function createTodo(todo: Todo) {
  if (todo.userId && todo.id && todo.title) {
    const res = await fetch(
      `${api_domain}/api/todos/${todo.userId}/${todo.id}/${todo.title}/createTodo`,
      {
        mode: "no-cors",
      }
    );
  } else {
    throw Error(`Missing data,can't create todo: ${JSON.stringify(todo)}`);
  }
}
export async function deleteAllTodos(userId: string) {
  if (userId) {
    const res = await fetch(`${api_domain}/api/todos/${userId}/deleteTodos`, {
      mode: "no-cors",
    });
  } else {
    throw Error(`Missing data,can't delete all todos of userId: ${userId}`);
  }
}
