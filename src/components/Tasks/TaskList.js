import React from "react";
import Card from "../UI/Card";
import styles from "./TaskList.module.css";

// const DUMMY_LIST = [
//   {
//     id: "l1",
//     title: "Learn React",
//     todo: "Learn React Early in the morning around 6am",
//   },
//   {
//     id: "l2",
//     title: "Learn NextJs",
//     todo: "Learn NextJs late in the night around 10pm",
//   },
// ];

const TaskList = (props) => {
  return (
    <section>
      <h2 className={styles.h2}>Tasks</h2>
      <ul className={styles.taskList}>
        {props.tasks.map((task) => {
          return (
            <li key={task.id}>
              <Card>
                <div className={styles.listContent}>
                  <p>{task.task}</p>
                  <div>
                    <button type="button">delete</button>
                  </div>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default TaskList;
