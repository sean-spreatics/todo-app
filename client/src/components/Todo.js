import { useState } from 'react';

const Todo = ({ item, deleteItem }) => {
  // console.log(item); // { id: 1, title: 'todo1', done: false, }
  const { id, title, done } = item;
  const [todoItem, setTodoItem] = useState(item);

  const onDeleteBtnClick = () => {
    deleteItem(todoItem);
  };

  return (
    <div className="Todo">
      <input
        type="checkbox"
        id={`todo${id}`}
        name={`todo${id}`}
        value={`todo${id}`}
        defaultChecked={done}
      />
      <label htmlFor={`todo${id}`}>{title}</label>
      <button onClick={onDeleteBtnClick}>DELETE</button>
    </div>
  );
};

export default Todo;
