import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../UI/Card";
import styles from "./TaskList.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../utils/supabase";
import {
  loadingVariants,
  listItemVariants,
} from "../../utils/animationVariants";
import { UserContext } from "../../utils/userContext";

const TaskList = ({ isFetchingTasks, tasks }) => {
  const { isUserLoggedIn } = useContext(UserContext);
  const [taskDeletingState, setTaskDeletingState] = useState({});

  const deleteHandler = async (id) => {
    setTaskDeletingState({ ...taskDeletingState, [id]: true });

    try {
      await supabase.from("tasks").delete().eq("id", id);
      setTaskDeletingState({ ...taskDeletingState, [id]: false });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!isUserLoggedIn ? (
        <div className={styles.link}>
          Please{" "}
          <Link to="/login" className={styles.authLinks}>
            login
          </Link>{" "}
          or{" "}
          <Link to="/register" className={styles.authLinks}>
            register
          </Link>{" "}
          an account to add a task
        </div>
      ) : (
        <section>
          <h2 className={styles.h2}>Tasks:</h2>
          {tasks.length === 0 && !isFetchingTasks ? (
            <h3 className={styles.noTasks}>No tasks available.</h3>
          ) : (
            <div>
              {isFetchingTasks ? (
                <motion.h3
                  variants={loadingVariants}
                  initial="hidden"
                  animate="visible"
                  className={styles.loadingTasks}
                >
                  Fetching your tasks...
                </motion.h3>
              ) : (
                <ul className={styles.taskList}>
                  <AnimatePresence>
                    {tasks.map((task, i) => {
                      const isDeleting = taskDeletingState[task.id] || false;

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
                                  disabled={isDeleting}
                                >
                                  {isDeleting ? "Deleting..." : "Delete"}
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
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default TaskList;
