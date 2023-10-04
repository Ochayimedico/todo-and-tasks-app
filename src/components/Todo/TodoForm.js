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
  const [isInputInvalid, setIsInputInvalid] = useState(false);
  const addTodoHandler = async () => {
    const titleContent = titleRef.current.value;
    const todoContent = todoRef.current.value;
    setIsAddingTodo(true);
    if (titleContent.trim() === "") {
      setIsInputInvalid(true);
      setIsAddingTodo(false);
      return;
    } else if (todoContent.trim() === "") {
      setIsInputInvalid(true);
      setIsAddingTodo(false);
      return;
    } else {
      setIsInputInvalid(false);
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

    titleRef.current.value = "";
    todoRef.current.value = "";
  };
  const changeHandler = () => {
    setIsInputInvalid(false);
  };
  return (
    <Card>
      <form>
        <h2 className={styles.title}>Add a todo</h2>
        <div className={styles.control}>
          <label htmlFor="title">Add title</label>
          <input
            type="text"
            id="title"
            ref={titleRef}
            onChange={changeHandler}
          />
          {isInputInvalid && (
            <p className={styles.error}>Input field is empty </p>
          )}
        </div>
        <div className={styles.control}>
          <label htmlFor="todo">Add todo</label>
          <textarea
            cols="1"
            rows="3"
            type="text"
            id="todo"
            ref={todoRef}
            onChange={changeHandler}
          ></textarea>
          {isInputInvalid && (
            <p className={styles.error}>Input field is empty </p>
          )}
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
