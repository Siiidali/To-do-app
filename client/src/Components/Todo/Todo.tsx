import { useState } from "react";
import TodoDetaills from "../TodoDetaills/TodoDetaills";
import styles from "./styles.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AiFillDelete } from "react-icons/ai";
import { todosType } from "../../types/todoType";

interface ITodoProps {
  todo: todosType;
}
const Todo = ({ todo }: ITodoProps) => {
  const [title, setTitle] = useState(todo.title);
  const queryClient = useQueryClient();
  const [popup, setPopup] = useState(false);
  const [completed, setCompleted] = useState(todo.completed);
  const patchMutation = useMutation(
    async () => {
      return await fetch(`http://localhost:3002/todos/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todos"]);
      },
    }
  );
  const deleteMutation = useMutation(
    async () => {
      return await fetch(`http://localhost:3002/todos/${todo.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todos"]);
      },
    }
  );
  const changeHandler = () => {
    patchMutation.mutate();
    setCompleted(!completed);
  };

  const titleHandler = (e: any) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const updateTitleHandler = () => {};

  return (
    <div className={styles.todo}>
      <div className={styles.todoInfo}>
        <input type="checkbox" checked={completed} onChange={changeHandler} />
        <input
          className={styles.title}
          type="text"
          value={title}
          onChange={titleHandler}
          onBlur={updateTitleHandler}
        />
        <button
          onClick={() => {
            setPopup(!popup);
          }}
        >
          Detaills
        </button>
        <button
          onClick={() => {
            deleteMutation.mutate();
          }}
        >
          <AiFillDelete />
        </button>
      </div>

      {popup && <TodoDetaills todo={todo} />}
    </div>
  );
};

export default Todo;
