import React, { useRef, useState } from "react";
import { supabase } from "../../utils/supabase";
import { motion } from "framer-motion";
import Button from "../UI/Button";
import Card from "../UI/Card";
import styles from "./TaskForm.module.css";
import { validateTaskInput } from "../../utils/validation";
import { loadingVariants } from "../../utils/animationVariants";


const TaskForm = () => {
  const taskRef = useRef();
  const [invalidInput, setInvalidInput] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false)
 
  /**
   * Handles adding a task.
   */
  const addTaskHandler = async () => {
    setIsAddingTask(true);
    const taskContent = taskRef.current.value;
    const emptyTaskInput = validateTaskInput(taskContent);
    if (emptyTaskInput) {
      setInvalidInput(emptyTaskInput);
      setIsAddingTask(false);
      return;
    } else {
      try {
        await supabase
          .from("tasks")
          .insert([{ task: taskContent }])
          .select();

      } catch (error) {
        console.error(error);
      }
      setInvalidInput("");
      setIsAddingTask(false);
      taskRef.current.value = "";
    }
  };
  const changeHandler = () => {
    setInvalidInput("");
  };
  return (
    <Card>
      <form>
        <div className={styles.control}>
          <label htmlFor="task">Add task</label>
          <textarea
            cols="1"
            rows="4"
            type="text"
            id="task"
            ref={taskRef}
            onChange={changeHandler}
          ></textarea>

          <p className={styles.error}>{invalidInput}</p>
        </div>
        <div className={styles.actions}>
          <Button onAddHandler={addTaskHandler}>
            {isAddingTask ? (
              <motion.span
                variants={loadingVariants}
                initial="hidden"
                animate="visible"
                className={styles.addingTask}
              >
                Adding task...
              </motion.span>
            ) : (
              "Add Task"
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default TaskForm;
