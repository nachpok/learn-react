import { Todo } from "./List";
const domain = "https://todo-api-juzg.vercel.app";
// const domain = "  http://localhost:3000";
export async function toggleTodo(todo: Todo) {
  if (todo.userId && todo.id) {
    const res = await fetch(
      `${domain}/api/todos/${todo.userId}/${todo.id}/toggle`
    );
  } else {
    throw Error(`Missing data,can't toggle todo: ${todo}`);
  }
}
export async function deleteTodo(todo: Todo) {
  if (todo.userId && todo.id) {
    const res = await fetch(
      `${domain}/api/todos/${todo.userId}/${todo.id}/deleteTodo`
    );
  } else {
    throw Error(`Missing data,can't delete todo: ${todo}`);
  }
}
export async function createTodo(todo: Todo) {
  if (todo.userId && todo.id && todo.title) {
    const res = await fetch(
      `${domain}/api/todos/${todo.userId}/${todo.id}/${todo.title}/createTodo`
    );
  } else {
    throw Error(`Missing data,can't create todo: ${todo}`);
  }
}
export async function deleteAllTodos(userId: string) {
  if (userId) {
    const res = await fetch(`${domain}/api/todos/${userId}/deleteTodos`);
  } else {
    throw Error(`Missing data,can't delete all todos of userId: ${userId}`);
  }
}
