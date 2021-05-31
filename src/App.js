import React, { useState, useCallback, useEffect } from 'react';
import "./App.css";

function App() {
  // hooks...
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const onNewTodoChange = useCallback((event) => {
    setNewTodo(event.target.value);
  }, []);

  const formSubmitted = useCallback((event) => {
    event.preventDefault();
    if(!newTodo.trim()) return;
    setTodos([// the spread operator[...todos] takes the existing todos array and adds in the newly created todo.
      
      {
        id: todos.length ? todos[0].id + 1: 1,
        content: newTodo,
        done: false,
      },
      ...todos,// adding the spread operator here adds the newt todo to the top
    ]);

    

    setNewTodo('');
  }, [newTodo,todos]);

  useEffect(() => {
    // console.log("todos",todos);
  }, [todos]);

  const addTodo = useCallback((todo, index) => (event) => {
      const newTodos = [...todos];
      newTodos.splice(index, 1, {
        ...todo,
        done: !todo.done
      });
      setTodos(newTodos);
    }, [todos]);

    const deleteTodo = useCallback((todo) => (event) =>{
      setTodos(todos.filter(otherTodo => otherTodo !== todo));
    }, [todos])
  
    const markAllDone = useCallback(() => {
      // Create a copy of the array
      // create a copy of each of the items
      // Update the done property to be "true" on each of the items.
      const updatedTodos = todos.map((todo) => {
        return {
          ...todo,
          done: true,
        }
      })
      setTodos(updatedTodos)
    }, [todos])

  return (
    <div>
      <form onSubmit={formSubmitted}>
        <label htmlFor="newTodo" >Enter Todo</label>
        <input 
          value={newTodo} 
          onChange={onNewTodoChange} 
          id="newTodo"/>
        <button>Add Todo</button>
      </form>
      <button onClick={markAllDone}>Mark all as done</button>
      <ul>
        {todos.map((todo, index) => {
          return <li key={todo.id}>
            <input 
              checked={todo.done}
              type="checkbox"
              onChange={addTodo(todo, index)} 
            />
            
            <span className={todo.done ? 'done' : ''}>
              {todo.content}
            </span>
            <button onClick={deleteTodo(todo)}>Delete</button>
            </li>
        })
        }
      </ul>
    </div>
    );
}

export default App;

// const [name, setName] = useState("AnDrEw");
// const onNameChange = useCallback((event) => {
//   console.log(event.target.value);
//   setName(event.target.value);
// }, []) 


/* <form action="">
<label>Enter your Name</label>
<input 
  value={name} 
  onChange={onNameChange}
// onChange={(event) => {console.log(event) setName(event.target.value);}}
/>
</form>
<h1>Hello {name}</h1> */