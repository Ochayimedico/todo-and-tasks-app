import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Card from "../UI/Card";
import styles from "./TodoList.module.css";
import { supabase } from "../../utils/supabase";
import {
  loadingVariants,
  listItemVariants,
} from "../../utils/animationVariants";

const TodoList = ({ todos, isFetchingTodos }) => {
  const [todoDeletingState, setTodoDeletingState] = useState({});

  const onClickHandler = async (id) => {
    setTodoDeletingState({ ...todoDeletingState, [id]: true });
    try {
      await supabase.from("todos").delete().eq("id", id);
    } catch (error) {
      console.error(error);
    } finally {
      setTodoDeletingState({ ...todoDeletingState, [id]: false });
    }
  };
  return (
    <>
      <section>
        <h2 className={styles.h2}>Todos:</h2>
        {isFetchingTodos ? (
          <motion.h2
            variants={loadingVariants}
            initial="hidden"
            animate="visible"
            className={styles.loadingTodos}
          >
            Fetching your todos...
          </motion.h2>
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
                            type="button"
                            onClick={() => onClickHandler(list.id)}
                            disabled={isDeleting}
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
      </section>
    </>
  );
};
export default TodoList;
