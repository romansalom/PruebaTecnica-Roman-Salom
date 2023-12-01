"use client"
import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks debe ser usado dentro de un provider ");
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => []);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const item = localStorage.getItem("tasks");

    if (item) {
      try {
        const tasks = JSON.parse(item);
        console.log(tasks);

        if (tasks && tasks.length > 0) {
          setTasks(tasks);
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }

    // Set loading to false after tasks are loaded
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const createTask = (title, description) => {
    setTasks([...tasks, { title, description, id: uuid() }]);
  };

  const deleteTask = (id) =>
    setTasks([...tasks.filter((task) => task.id !== id)]);

  const updateTask = (id, newData) => {
    setTasks([...tasks.map((task) => (task.id === id ? { ...task, ...newData } : task))]);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading, // Add loading to the context value
        createTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
