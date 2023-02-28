import { useQuery } from "@tanstack/react-query";
import Todo from "../Todo/Todo";
import styles from "./style.module.css";
import { todosType } from "../../types/todoType";
const TodosList = () => {
  const {
    isError,
    isLoading,
    data: todos,
  } = useQuery<todosType[]>(["todos"], async () => {
    const res = await fetch(
      `http://localhost:3002/todos?userId=${localStorage.getItem("id")}`
    );
    const data = await res.json();
    return data;
  });
  if (isError) return <p>There is an error </p>;
  if (isLoading) return <p>Is looding ...</p>;
  return (
    <div className={styles.todoList}>
      {todos && todos.map((todo: todosType) => <Todo todo={todo} />).reverse()}
    </div>
  );
};

export default TodosList;
