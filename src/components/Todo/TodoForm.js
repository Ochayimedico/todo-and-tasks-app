import React, { useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import styles from "./TodoForm.module.css";

const TodoForm = (props) => {
  const titleRef = useRef();
  const todoRef = useRef();

  const addTodoHandler = () => {
    const titleContent = titleRef.current.value;
    const todoContent = todoRef.current.value;

    if (titleContent.trim() === "" || todoContent.trim() === "") {
      return;
    }
    props.onAddTodo(titleContent, todoContent);
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
          <Button onAddHandler={addTodoHandler}>Add Todo</Button>
        </div>
      </form>
    </Card>
  );
};
export default TodoForm;
