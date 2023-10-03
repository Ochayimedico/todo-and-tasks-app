import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
// import { Link } from "react-router-dom";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import styles from "./Todo.module.css";
import { motion } from "framer-motion";
import { linksVariants } from "../../utils/animationVariants";

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [isFetchingTodos, setIsFetchingTodos] = useState(false);

  useEffect(() => {
    setIsFetchingTodos(true);
    const fetchTodos = async () => {
      try {
        let { data: todos, error } = await supabase
          .from("todos")
          .select("id, todo_title, todo");
        if (todos) {
          setIsFetchingTodos(false);
          setTodo(todos);
        } else if (error) {
          console.error("error loading todos", error);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodos();
  }, []);

  const addTodoHandler = () => {};

  return (
    <motion.div
      variants={linksVariants}
      initial="hidden"
      animate="visible"
      className={styles.todoContent}
    >
      <TodoForm onAddTodo={addTodoHandler} />
      <TodoList todos={todo} isFetchingTodos={isFetchingTodos} />
    </motion.div>
  );
};
export default Todo;
