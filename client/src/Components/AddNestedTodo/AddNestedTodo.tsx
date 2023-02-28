import { useState } from "react";
import styles from "./styles.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { nestedTodoType } from "../../types/nestedTodoType";
import { todosType } from "../../types/todoType";

interface IAddNestedTodosProps {
  todo: todosType;
}

const AddNestedTodos = ({ todo }: IAddNestedTodosProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      endDate: "",
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (newTodo: any) => {
      return await fetch(`http://localhost:3002/nestedTodos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(newTodo),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["nestedTodos"]);
      },
    }
  );

  return (
    <div className={styles.addTodo}>
      <form
        className={styles.addForm}
        onSubmit={handleSubmit((data) => {
          const newTodo = {
            todoId: todo.id,
            ...data,
            completed: false,
            pos: 1,
            userId: localStorage.getItem("id"),
          };
          mutation.mutate(newTodo);
        })}
      >
        <h3>Add a new To do</h3>
        <input
          {...register("title", { required: "This is required filed" })}
          type="text"
          placeholder="Do a homework"
          onChange={() => {}}
        />
        <p>{errors.title?.message}</p>
        <input
          {...register("description")}
          type="text"
          placeholder="Description"
          onChange={() => {}}
        />
        <p>{errors.description?.message}</p>

        <input
          {...register("endDate")}
          type="text"
          placeholder="End Date"
          onChange={() => {}}
        />
        <p>{errors.endDate?.message}</p>

        <button type="submit">Add new To do</button>
      </form>
    </div>
  );
};

export default AddNestedTodos;
