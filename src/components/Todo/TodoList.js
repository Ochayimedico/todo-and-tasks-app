import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Card from "../UI/Card";
import styles from "./TodoList.module.css";
import { supabase } from "../../utils/supabase";
import {
  loadingVariants,
  listItemVariants,
} from "../../utils/animationVariants";
import { UserContext } from "../../utils/userContext";

const TodoList = ({ todos, isFetchingTodos }) => {
  const { isUserLoggedIn } = useContext(UserContext);
  const [todoDeletingState, setTodoDeletingState] = useState({});

  const onClickHandler = async (id) => {
    setTodoDeletingState({ ...todoDeletingState, [id]: true });
    try {
      await supabase.from("todos").delete().eq("id", id);
      setTodoDeletingState({ ...todoDeletingState, [id]: false });
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
          an account to add a todo
        </div>
      ) : (
        <section>
          <h2 className={styles.h2}>Todos:</h2>
          {todos.length === 0 && !isFetchingTodos ? (
            <h3 className={styles.noTodos}>No todos available. Add a todo.</h3>
          ) : (
            <div>
              {isFetchingTodos ? (
                <motion.h3
                  variants={loadingVariants}
                  initial="hidden"
                  animate="visible"
                  className={styles.loadingTodos}
                >
                  Fetching your todos...
                </motion.h3>
              ) : (
                <ul className={styles.todoList}>
                  <AnimatePresence>
                    {todos.map((list, i) => {
                      const isDeleting = todoDeletingState[list.id] || false;
                      return (
                        <motion.li
                          variants={listItemVariants}
                          initial="hidden"
                          animate="visible"
                          custom={i}
                          exit="exit"
                          key={list.id}
                        >
                          <Card>
                            <div className={styles.listContent}>
                              <div className={styles.textContent}>
                                <h4>{list.todo_title}</h4>
                                <p>{list.todo}</p>
                              </div>
                              <div className={styles.button}>
                                <button
                                  disabled={isDeleting}
                                  type="button"
                                  onClick={() => onClickHandler(list.id)}
                                >
                                  {isDeleting ? "deleting..." : "delete"}
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
export default TodoList;
