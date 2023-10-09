import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { supabase } from "../../utils/supabase";
import styles from "./Tasks.module.css";
import { motion } from "framer-motion";
import { linksVariants } from "../../utils/animationVariants";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isFetchingTasks, setIsFetchingTasks] = useState(false);
  useEffect(() => {
    setIsFetchingTasks(true);
    // Function to fetch the initial list of tasks
    const fetchTasks = async () => {
      try {
        let { data: tasks, error } = await supabase
          .from("tasks")
          .select("id, task");
        if (tasks) {
          setIsFetchingTasks(false);
          setTasks(tasks);
        } else if (error) {
          console.error("error loading tasks", error);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
    // Subscribe to real-time updates for the "tasks" table
    const tasksSubscription = supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            // Handle new task insertion
            setTasks((prevTasks) => [payload.new, ...prevTasks]);
          } else if (payload.eventType === "DELETE") {
            // Handle task deletion
            setTasks((prevTasks) =>
              prevTasks.filter((task) => task.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();
    return async () => {
      await tasksSubscription.unsubscribe();
    };
  }, []);

  return (
    <motion.div
      variants={linksVariants}
      initial="hidden"
      animate="visible"
      className={styles.tasksContent}
    >
      <TaskForm />
      <TaskList tasks={tasks} isFetchingTasks={isFetchingTasks} />
    </motion.div>
  );
};
export default Tasks;
