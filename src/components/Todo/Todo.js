import { useState } from "react";
// import { Link } from "react-router-dom";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import styles from "./Todo.module.css";

const Todo = () => {
  const [todo, setTodo] = useState([]);

  const addTodoHandler = (titleContent, todoContent) => {
    setTodo((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: Math.random().toString(),
          title: titleContent,
          todo: todoContent,
        },
      ];
    });
  };
  return (
    <div className={styles.todoContent}>
      <TodoForm onAddTodo={addTodoHandler} />
      <TodoList todos={todo} />
    </div>
  );
};
export default Todo;

// const mealsList = meals.map((meal) => (
//   <MealItem
//     id={meal.id}
//     key={meal.id}
//     name={meal.name}
//     description={meal.description}
//     price={meal.price}
//   />
