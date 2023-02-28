import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import "./index.css";
import {} from "react-router-dom";
import { useEffect, useState } from "react";

import TodosPage from "./Components/TodosPage/TodosPage";
import LogIn from "./Components/LogIn/LogIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodosPage />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
