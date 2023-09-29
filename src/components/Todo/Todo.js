import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
// import { Link } from "react-router-dom";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import styles from "./Todo.module.css";

const Todo = () => {
  const [todo, setTodo] = useState([]);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        let { data: todos, error } = await supabase
          .from("todos")
          .select("todo_title, todo");
        if (todos) {
          console.log(todos);
        } else if (error) {
          console.log("error loading todos", error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
  }, []);

  const addTodoHandler = (titleContent, todoContent) => {
    setTodo((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: Math.random().toString(),
          title: titleContent,
          todo: todoContent,
        },
      ];
    });
  };

  return (
    <div className={styles.todoContent}>
      <TodoForm onAddTodo={addTodoHandler} />
      <TodoList todos={todo} />
    </div>
  );
};
export default Todo;
