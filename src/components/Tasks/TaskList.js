import React from "react";
import Card from "../UI/Card";
import styles from "./TaskList.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../utils/supabase";
import {
  loadingVariants,
  listItemVariants,
} from "../../utils/animationVariants";

const TaskList = ({ isFetchingTasks, tasks }) => {
  const deleteHandler = async (id) => {
    try {
      await supabase.from("tasks").delete().eq("id", id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <h2 className={styles.h2}>Tasks:</h2>
      {isFetchingTasks ? (
        <motion.h2
          variants={loadingVariants}
          initial="hidden"
          animate="visible"
          className={styles.loadingTasks}
        >
          Fetching your tasks...
        </motion.h2>
      ) : (
        <ul className={styles.taskList}>
          <AnimatePresence>
            {tasks.map((task, i) => {
              return (
                <motion.li
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={i}
                  key={task.id}
                >
                  <Card>
                    <div className={styles.listContent}>
                      <p className={styles.text}>{task.task}</p>
                      <div>
                        <button
                          type="button"
                          onClick={() => deleteHandler(task.id)}
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}
    </section>
  );
};
export default TaskList;
