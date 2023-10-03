import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Button from "../UI/Button";
import Card from "../UI/Card";
import styles from "./TodoForm.module.css";
import { supabase } from "../../utils/supabase";
import { loadingVariants } from "../../utils/animationVariants";

const TodoForm = ({ onAddTodo }) => {
  const titleRef = useRef();
  const todoRef = useRef();
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const addTodoHandler = async () => {
    const titleContent = titleRef.current.value;
    const todoContent = todoRef.current.value;
    setIsAddingTodo(true);
    if (titleContent.trim() === "" || todoContent.trim() === "") {
      setIsAddingTodo(false);
      return;
    } else {
      try {
        await supabase
          .from("todos")
          .insert([{ todo_title: titleContent, todo: todoContent }])
          .select();
      } catch (error) {
        console.error(error);
      }
      setIsAddingTodo(false);
    }
    onAddTodo(titleContent, todoContent);
    titleRef.current.value = "";
    todoRef.current.value = "";
  };

  return (
    <Card>
      <form>
        <h2 className={styles.title}>Add a Todo</h2>
        <div className={styles.control}>
          <label htmlFor="title">Add Title</label>
          <input type="text" id="title" ref={titleRef} required />
        </div>
        <div className={styles.control}>
          <label htmlFor="todo">Add Todo</label>
          <textarea
            cols="1"
            rows="3"
            type="text"
            id="todo"
            ref={todoRef}
            required
          ></textarea>
        </div>
        <div className={styles.actions}>
          <Button onAddHandler={addTodoHandler}>
            {isAddingTodo ? (
              <motion.span
                variants={loadingVariants}
                initial="hidden"
                animate="visible"
                className={styles.addingTodo}
              >
                Adding Todo...
              </motion.span>
            ) : (
              "Add Todo"
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default TodoForm;
