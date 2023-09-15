import { useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import styles from "./Tasks.module.css";
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
    <div className={styles.tasksContent}>
      <TaskForm onAddTask={addTaskHandler} />
      <TaskList tasks={task} />
    </div>
  );
};
export default Tasks;
