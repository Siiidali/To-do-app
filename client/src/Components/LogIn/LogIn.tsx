import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(async ({ email }) => {
        const res = await fetch(
          `http://localhost:3002/authentification?email=${email}`
        );
        const users = await res.json();
        if (users && users.length) {
          localStorage.setItem("id", users[0].id);
          return navigate("/");
        } else {
          setError("Email dosn't exist");
        }
      })}
    >
      <h1>Please Enter Your E-mail</h1>
      <input
        placeholder="Example@example.com"
        type="email"
        {...register("email", { required: "This is required filed" })}
      />
      {errors.email?.message && <p>{errors.email?.message}</p>}
      {error && <p>{error}</p>}
      <button type="submit">LogIN</button>
    </form>
  );
};

export default LogIn;
