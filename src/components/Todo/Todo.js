import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import styles from "./Todo.module.css";
import { motion } from "framer-motion";
import { linksVariants } from "../../utils/animationVariants";
// import { useAuthState } from "../../utils/authState";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [isFetchingTodos, setIsFetchingTodos] = useState(false);
  // const { session, isUserLoggedIn } = useAuthState();
  useEffect(() => {
    // Fetching Initial Todos
    setIsFetchingTodos(true);
    const fetchTodos = async () => {
      try {
        let { data: todos, error } = await supabase
          .from("todos")
          .select("id, todo_title, todo");
        if (todos) {
          setIsFetchingTodos(false);
          setTodos(todos);
        } else if (error) {
          console.error("error loading todos", error);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodos();
    // Subscribe to real-time updates for the "todos" table
    const todosSubscription = supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "todos" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            // Handle new todo insertion
            setTodos((prevTodos) => [payload.new, ...prevTodos]);
          } else if (payload.eventType === "DELETE") {
            // Handle todo deletion
            setTodos((prevTasks) =>
              prevTasks.filter((todo) => todo.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();
    return () => {
      todosSubscription.unsubscribe();
    };
  }, []);

  return (
    <motion.div
      variants={linksVariants}
      initial="hidden"
      animate="visible"
      className={styles.todoContent}
    >
      <div>
        <TodoForm />
        <TodoList todos={todos} isFetchingTodos={isFetchingTodos} />
      </div>
      )
    </motion.div>
  );
};
export default Todo;
