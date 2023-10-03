import { useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import styles from "./Tasks.module.css";
import { motion } from "framer-motion";
import { linksVariants } from "../../utils/animationVariants";
const Tasks = () => {
  const [task, setTask] = useState([]);

  const addTaskHandler = (taskContent) => {
    setTask((prevTasks) => {
      return [
        ...prevTasks,
        { id: Math.random().toString(), task: taskContent },
      ];
    });
  };

  return (
    <motion.div
      variants={linksVariants}
      initial="hidden"
      animate="visible"
      className={styles.tasksContent}
    >
      <TaskForm onAddTask={addTaskHandler} />
      <TaskList tasks={task} />
    </motion.div>
  );
};
export default Tasks;
