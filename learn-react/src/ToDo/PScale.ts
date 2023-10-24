import { Todo } from "./List";
export const api_domain =
  process.env.REACT_APP_NEXT_PUBLIC_TODO_API_URL ||
  process.env.NEXT_PUBLIC_TODO_API_URL;
export async function toggleTodo(todo: Todo) {
  validateTodoProperties("toggleTodo", todo);
  try {
    const url = `https://todo-api-juzg.vercel.app/api/todos/${todo.userId}/${todo.id}/toggle`;
    const res = await fetch(url);
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

function validateTodoProperties(method: string, todo: Partial<Todo>): void {
  const keys = Object.keys(todo) as Array<keyof Todo>;
  for (const key of keys) {
    if (todo[key] === undefined) {
      throw new Error(`PScale.${method} - Property "${key}" is undefined.`);
    }
  }
}
