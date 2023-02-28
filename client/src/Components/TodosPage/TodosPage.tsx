import { useEffect, useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import TodosList from "../TodoList/TodosList";
import styles from "./styles.module.css";
import { Navigate } from "react-router-dom";
const TodosPage = () => {
  const loggedOrNot = JSON.parse(localStorage.getItem("id")!);
  const [user, setUser] = useState<any>(loggedOrNot);
  useEffect(() => {
    console.log(typeof loggedOrNot);

    if (loggedOrNot) {
      setUser(JSON.parse(localStorage.getItem("id")!));
    }
  }, []);

  if (!user) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <div className={styles.todosPage}>
        <h1>To do List</h1>
        <AddTodo />
        <br />
        <br />
        <TodosList />
      </div>
    );
  }
};

export default TodosPage;
