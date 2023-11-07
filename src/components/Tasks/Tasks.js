import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { supabase } from "../../utils/supabase";
import styles from "./Tasks.module.css";
import { AnimatePresence, motion } from "framer-motion";
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
          .select("id, task, created_at");

        if (tasks) {
          setIsFetchingTasks(false);
          setTasks(tasks);
        } else if (error) {
          throw new Error("error loading tasks");
        }
      } catch (error) {
        throw new Error(" error fetching tasks");
      }
    };
    fetchTasks();
  }, []);
  useEffect(() => {
    // Subscribe to real-time updates for the "tasks" table
    const tasksSubscription = supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            // Handle new task insertion
            setTasks((prevTasks) => [...prevTasks, payload.new]);
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
    <AnimatePresence>
      <motion.div className={styles.container}>
        <motion.div
          variants={linksVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={styles.tasksContent}
        >
          <TaskForm />
          <TaskList
            tasks={tasks}
            isFetchingTasks={isFetchingTasks}
            setTasks={setTasks}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
export default Tasks;
