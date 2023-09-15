import React, { useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import styles from "./TaskForm.module.css";
const TaskForm = (props) => {
  const taskRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();
  };
  const addTaskHandler = () => {
    const taskContent = taskRef.current.value;

    if (taskContent.length === 0) {
      return;
    }

    props.onAddTask(taskContent);
    taskRef.current.value = "";
  };
  return (
    <Card>
      <form onSubmit={submitFormHandler}>
        <h2>Add a Task</h2>
        <div className={styles.control}>
          <label htmlFor="task">Add Task</label>
          <textarea
            cols="1"
            rows="4"
            type="text"
            id="task"
            ref={taskRef}
            required
          ></textarea>
        </div>
        <div className={styles.actions}>
          <Button onAddHandler={addTaskHandler}>Add Task</Button>
        </div>
      </form>
    </Card>
  );
};
export default TaskForm;
