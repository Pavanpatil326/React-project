import React, { useState } from 'react';
import "./App.css";
import Todoinput from './components/Todoinput';
import TodoList from './components/TodoList';

function App() {
  const [listTodo, setListTodo] = useState([]);
  const [recycleBin, setRecycleBin] = useState([]);

  // Add new item to the to-do list
  let addList = (inputText) => {
    if (inputText !== '')
      setListTodo([...listTodo, inputText]);
  };

  // Move item to recycle bin
  const deleteListItem = (key) => {
    const deletedItem = listTodo[key];
    // Add the deleted item to recycle bin
    setRecycleBin([...recycleBin, deletedItem]);

    // Remove the item from the main list
    let newListTodo = [...listTodo];
    newListTodo.splice(key, 1);
    setListTodo([...newListTodo]);
  };

  // Restore item from recycle bin to to-do list
  const restoreItem = (key) => {
    const restoredItem = recycleBin[key];
    setListTodo([...listTodo, restoredItem]);

    // Remove the restored item from the recycle bin
    let newRecycleBin = [...recycleBin];
    newRecycleBin.splice(key, 1);
    setRecycleBin([...newRecycleBin]);
  };

  // Permanently delete item from recycle bin
  const permanentlyDeleteItem = (key) => {
    let newRecycleBin = [...recycleBin];
    newRecycleBin.splice(key, 1);
    setRecycleBin([...newRecycleBin]);
  };

  return (
    <div className="main-container">
      <div className="center-container">
        <Todoinput addList={addList} />
        <h1 className="app-heading">TODO</h1>
        <hr />
        {listTodo.length === 0 && <p>No tasks added!</p>}
        {listTodo.map((listItem, i) => (
          <TodoList key={i} index={i} item={listItem} deleteItem={deleteListItem} />
        ))}

        <h1 className="app-heading">Recycle Bin</h1>
        <hr />
        {recycleBin.length === 0 && <p>Recycle bin is empty!</p>}
        {recycleBin.map((recycleItem, i) => (
          <div key={i} className="recycle-item">
            <p>{recycleItem}</p>
            <button onClick={() => restoreItem(i)}>Restore</button>
            <button onClick={() => permanentlyDeleteItem(i)}>Delete Permanently</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


