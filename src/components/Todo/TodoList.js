import React, { useState } from "react";

import Card from "../UI/Card";
import styles from "./TodoList.module.css";

const DUMMY_LIST = [
  {
    id: "l1",
    title: "Learn React",
    todo: "Learn React Early in the morning around 6am",
  },
  {
    id: "l2",
    title: "Learn NextJs",
    todo: "Learn NextJs late in the night around 10pm",
  },
];

const TodoList = ({ todos }) => {
  const [todo, setTodo] = useState(DUMMY_LIST);
  const onClickHandler = (id) => {
    const newList = todo.filter((list) => list.id !== id);
    return setTodo(newList);
  };
  return (
    <>
      <section>
        <h2 className={styles.h2}>Todos</h2>
        <ul className={styles.todoList}>
          {todo.map((list) => {
            return (
              <li key={list.id}>
                <Card>
                  <div className={styles.listContent}>
                    <div>
                      <h4>{list.title}</h4>
                      <p>{list.todo}</p>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => onClickHandler(list.id)}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      </section>
      <section>
        <ul className={styles.todoList}>
          {todos.map((list) => {
            return (
              <li key={list.id}>
                <Card>
                  <div className={styles.listContent}>
                    <div>
                      <h4>{list.title}</h4>
                      <p>{list.todo}</p>
                    </div>
                    <div>
                      <button type="button" onClick={onClickHandler}>
                        delete
                      </button>
                    </div>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};
export default TodoList;
