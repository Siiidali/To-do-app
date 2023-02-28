import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./styles.module.css";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import AddNestedTodos from "../AddNestedTodo/AddNestedTodo";
import { todosType } from "../../types/todoType";
import { nestedTodoType } from "../../types/nestedTodoType";

interface ITodoDetaillsProps {
  todo: todosType;
}

const TodoDetaills = ({ todo }: ITodoDetaillsProps) => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: nestedTodos,
  } = useQuery<nestedTodoType[]>(["nestedTodos"], async () => {
    const res = await fetch(
      `http://localhost:3002/nestedTodos?todoId=${todo.id}`
    );
    const data = await res.json();
    return data;
  });

  const deleteMutation = useMutation(
    async (nestedTodo: nestedTodoType) => {
      return await fetch(`http://localhost:3002/todos/${nestedTodo.id}`, {
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

  const patchMutation = useMutation(
    async (nestedTodo: nestedTodoType) => {
      return await fetch(`http://localhost:3002/nestedTodos/${nestedTodo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ completed: !nestedTodo.completed }),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["nestedTodos"]);
      },
    }
  );
  const changeHandler = async (nestedTodo: nestedTodoType) => {
    await patchMutation.mutate(nestedTodo);
  };

  if (isError) return <p>There is an error</p>;
  if (isLoading) return <p>Loading ...</p>;
  return (
    <div>
      <div className={styles.description}>
        <h4>Description : </h4>
        <h4>{todo.description}</h4>
      </div>
      <div className={styles.endDate}>
        <h4>End Date : </h4>
        <h4>{todo.endDate}</h4>
      </div>
      <div className={styles.nestedTodos}>
        {nestedTodos &&
          nestedTodos.map((nestedTodo: nestedTodoType) => (
            <div className={styles.nestedTodo}>
              <div className={styles.nestedTodoInfo}>
                <input
                  type="checkbox"
                  checked={nestedTodo.completed}
                  onChange={() => {
                    changeHandler(nestedTodo);
                  }}
                  name=""
                  id=""
                />
                <p>{nestedTodo.title}</p>
              </div>

              <div className={styles.description}>
                <h4>Description : </h4>
                <h4>{nestedTodo.description}</h4>
              </div>
              <div className={styles.endDate}>
                <h4>End Date : </h4>
                <h4>{nestedTodo.endDate}</h4>
              </div>
              <button
                onClick={() => {
                  deleteMutation.mutate(nestedTodo);
                }}
              >
                <AiFillDelete />
              </button>
            </div>
          ))}
        <AddNestedTodos todo={todo} />
      </div>
    </div>
  );
};

export default TodoDetaills;
