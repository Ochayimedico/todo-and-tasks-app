import React, { useRef, useState } from "react";
// import { supabase } from "../../utils/supabase";

import { ref, push, set } from "firebase/database";
import "../../utils/firebaseConfig";
import { database } from "../../utils/firebaseConfig";
import Button from "../UI/Button";
import Card from "../UI/Card";
import styles from "./TaskForm.module.css";

const TaskForm = (props) => {
  const taskRef = useRef();
  const [isInputInvalid, setIsInputInvalid] = useState(false);

  const submitFormHandler = (e) => {
    e.preventDefault();
  };

  /**
   * Handles adding a task.
   */
  const addTaskHandler = () => {
    const taskContent = taskRef.current.value;

    if (taskContent.trim().length === 0) {
      setIsInputInvalid(true);
      return;
    } else {
      setIsInputInvalid(false);
    }
    const tasksListRef = ref(database, "tasksList");
    const newTaskRef = push(tasksListRef);
    if (isInputInvalid) {
      set(newTaskRef, {
        task: taskContent,
      })
        .then(() => {
          alert("task saved successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    props.onAddTask(taskContent);
    taskRef.current.value = "";
  };
  const changeHandler = () => {
    setIsInputInvalid(false);
  };
  return (
    <Card>
      <form onSubmit={submitFormHandler}>
        <div className={styles.control}>
          <label htmlFor="task">Add Task</label>
          <textarea
            cols="1"
            rows="4"
            type="text"
            id="task"
            ref={taskRef}
            onChange={changeHandler}
          ></textarea>
          {isInputInvalid && (
            <p className={styles.error}>Input field is empty🤨🤔 </p>
          )}
        </div>

        <div className={styles.actions}>
          <Button onAddHandler={addTaskHandler}>Add Task</Button>
        </div>
      </form>
    </Card>
  );
};

export default TaskForm;
