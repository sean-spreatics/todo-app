import { useState, useRef } from 'react';
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import './styles/App.scss';

const App = () => {
  const [todoItems, setTodoItems] = useState([
    {
      id: 1,
      title: 'My Todo1',
      done: false,
    },
    {
      id: 2,
      title: 'My Todo2',
      done: false,
    },
    {
      id: 3,
      title: 'My Todo3',
      done: true,
    },
  ]);
  const todoId = useRef(4);

  // AddTodo 컴포넌트는 상위 컴포넌트(App)의 todoItems(state)에 접근 불가능
  // 상위 컴포넌트(App)은 AddTodo 컴포넌트 접근 가능
  // => App 컴포넌트에 addItem() 함수를 정의하고, 해당 함수를 AddTodo props로 넘겨야 함
  const addItem = (newItem) => {
    // newItem - {id: xx, title: xx, done: false}
    newItem.id = todoId.current++; // key를 위한 id 설정
    newItem.done = false; // done 초기화
    // 기존 todoItems를 유지하고, 새로운 newItem을 추가
    setTodoItems([...todoItems, newItem]); // setTodoItems(todoItems.concat(newItem))
  };

  // 전체 Todo 리스트(todoItems)는 App 컴포넌트에서 관리하고 있으므로
  // deleteItem() 함수는 App 컴포넌트에 작성해야 함
  const deleteItem = (targetItem) => {
    let newTodoItems = todoItems.filter((item) => item.id !== targetItem.id);
    setTodoItems(newTodoItems);
  };

  return (
    <div className="App">
      <header>😀 Sean Todo App</header>
      <AddTodo addItem={addItem} />
      <div className="left-todos">🚀 {todoItems.length} Todos</div>
      {todoItems.length > 0 ? (
        todoItems.map((item) => {
          // console.log(item); // {id: 1, title: 'My Todo1', done: false}
          return <Todo key={item.id} item={item} deleteItem={deleteItem} />;
        })
      ) : (
        <p className="empty-todos">Todo를 추가해주세요🔥</p>
      )}
    </div>
  );
};

export default App;
