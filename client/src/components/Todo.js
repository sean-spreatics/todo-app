import { useState } from 'react';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Todo.scss';

const Todo = ({ item, deleteItem, updateItem }) => {
  // console.log(item); // { id: 1, title: 'todo1', done: false, }
  const { id, title, done } = item;
  const [todoItem, setTodoItem] = useState(item);
  const [readOnly, setReadOnly] = useState(true);

  const onDeleteBtnClick = () => {
    deleteItem(todoItem);
  };

  // title input 커서가 깜빡인다고 수정이 가능한 것은 아님
  // 사용자가 키보드 입력할 때마다 todoItem의 title을 새 값으로 변경
  const editEventHandler = (e) => {
    // rest: id, done 정보
    const { title, ...rest } = todoItem; // { id: 1, title: 'todo1', done: false, }

    setTodoItem({
      title: e.target.value,
      ...rest,
    });
  };

  // title input 클릭시 (title를 수정하겠다!!) : readOnly state를 false로 변경
  const offReadOnlyMode = () => {
    setReadOnly(false);
  };

  // title input에서 enter 키 입력시 (title 수정을 완료했다!!): readOnly state를 true로 변경
  const enterKeyEventHandler = (e) => {
    if (e.key === 'Enter') {
      setReadOnly(true);
      updateItem(todoItem); // 수정1 (엔터 누르면 저장)
    }
  };

  // checkbox 업데이트
  // done: true -> false, fasle, -> true
  const checkboxEventHandler = (e) => {
    // rest: id, title 정보
    const { done, ...rest } = todoItem; // { id: 1, title: 'todo1', done: false, }
    const updatedItem = {
      done: e.target.checked,
      ...rest,
    };
    setTodoItem(updatedItem);
    updateItem(updatedItem); // 수정2(체크박스 변경시 저장) -> 변경될 대상
  };

  return (
    <div className="Todo">
      <input
        type="checkbox"
        id={`todo${id}`}
        name={`todo${id}`}
        value={`todo${id}`}
        defaultChecked={done}
        onChange={checkboxEventHandler}
      />
      {/* <label htmlFor={`todo${id}`}>{title}</label> */}
      <input
        type="text"
        value={todoItem.title}
        onChange={editEventHandler}
        onClick={offReadOnlyMode}
        onKeyPress={enterKeyEventHandler}
        readOnly={readOnly}
      />
      <button onClick={onDeleteBtnClick}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </div>
  );
};

export default Todo;
