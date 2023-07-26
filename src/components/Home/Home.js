import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { auth } from "./firebase";
import { getAuth, signOut } from "firebase/auth";
import './Home.css'
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';

const Home = (props) => {

    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    const [allTodos, setAllTodos] = useState ([]);
    const [newTodoTitle, setNewTodoTitle] = useState ('');
    const [newDescription, setNewDescription] = useState ('');
    const [completedTodos, setCompletedTodos] = useState ([]);
    const [isCompletedScreen, setIsCompletedScreen] = useState (false);

    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUserName(user.displayName);
        } else {
            setUserName("")
            navigate("/login")
        };
      });
    }, []);

    const handleSignOut = () =>{
        const auth = getAuth();
        signOut(auth).then(() => {
            navigate("/login")
        }).catch((error) => {
            console.log(error)
        });
    }
    const handleAddNewToDo = () => {
        let newToDoObj = {
          title: newTodoTitle,
          description: newDescription,
        };
        // console.log (newToDoObj);
        let updatedTodoArr = [...allTodos];
        updatedTodoArr.push (newToDoObj);
        // console.log (updatedTodoArr);
        setAllTodos (updatedTodoArr);
        localStorage.setItem ('todolist', JSON.stringify (updatedTodoArr));
        setNewDescription ('');
        setNewTodoTitle ('');
      };
    
      useEffect (() => {
        let savedTodos = JSON.parse (localStorage.getItem ('todolist'));
        let savedCompletedToDos = JSON.parse (
          localStorage.getItem ('completedTodos')
        );
        if (savedTodos) {
          setAllTodos (savedTodos);
        }
    
        if (savedCompletedToDos) {
          setCompletedTodos (savedCompletedToDos);
        }
      }, []);
    
      const handleToDoDelete = index => {
        let reducedTodos = [...allTodos];
        reducedTodos.splice (index);
        // console.log (index);
    
        // console.log (reducedTodos);
        localStorage.setItem ('todolist', JSON.stringify (reducedTodos));
        setAllTodos (reducedTodos);
      };
    
      const handleCompletedTodoDelete = index => {
        let reducedCompletedTodos = [...completedTodos];
        reducedCompletedTodos.splice (index);
        // console.log (reducedCompletedTodos);
        localStorage.setItem (
          'completedTodos',
          JSON.stringify (reducedCompletedTodos)
        );
        setCompletedTodos (reducedCompletedTodos);
      };
    
      const handleComplete = index => {
        const date = new Date ();
        var dd = date.getDate ();
        var mm = date.getMonth () + 1;
        var yyyy = date.getFullYear ();
        var hh = date.getHours ();
        var minutes = date.getMinutes ();
        var ss = date.getSeconds ();
        var finalDate =
          dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;
    
        let filteredTodo = {
          ...allTodos[index],
          completedOn: finalDate,
        };
    
        // console.log (filteredTodo);
    
        let updatedCompletedList = [...completedTodos, filteredTodo];
        console.log (updatedCompletedList);
        setCompletedTodos (updatedCompletedList);
        localStorage.setItem (
          'completedTodos',
          JSON.stringify (updatedCompletedList)
        );
        // console.log (index);
    
        handleToDoDelete (index);
      };
    
  
  return (
    
    <div className="App">
        <h1>Hello {userName} </h1>     
        <div class="container">
          <button onClick={handleSignOut} className="logOutButton">Log out</button>
        </div>
        <h2>What are you up to today?</h2>
        <div className="todo-wrapper">

<div className="todo-input">
  <div className="todo-input-item">
    <label>Title:</label>
    <input
      type="text"
      value={newTodoTitle}
      onChange={e => setNewTodoTitle (e.target.value)}
      placeholder="What's the title of your To Do?"
    />
  </div>
  <div className="todo-input-item">
    <label>Description:</label>
    <input
      type="text"
      value={newDescription}
      onChange={e => setNewDescription (e.target.value)}
      placeholder="What's the description of your To Do?"
    />
  </div>
  <div className="todo-input-item">
    <button
      className="primary-btn"
      type="button"
      onClick={handleAddNewToDo}
    >
      Add
    </button>
  </div>
</div>
<div className="btn-area">
  <button
    className={`secondaryBtn ${isCompletedScreen === false && 'active'}`}
    onClick={() => setIsCompletedScreen (false)}
  >
    To Do
  </button>
  <button
    className={`secondaryBtn ${isCompletedScreen === true && 'active'}`}
    onClick={() => setIsCompletedScreen (true)}
  >
    Completed
  </button>
</div>
<div className="todo-list">

  {isCompletedScreen === false &&
    allTodos.map ((item, index) => (
      <div className="todo-list-item" key={index}>
        <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>

        </div>
        <div>
          <AiOutlineDelete
            title="Delete?"
            className="icon"
            onClick={() => handleToDoDelete (index)}
          />
          <BsCheckLg
            title="Completed?"
            className=" check-icon"
            onClick={() => handleComplete (index)}
          />
        </div>
      </div>
    ))}

  {isCompletedScreen === true &&
    completedTodos.map ((item, index) => (
      <div className="todo-list-item" key={index}>
        <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p> <i>Completed at: {item.completedOn}</i></p>
        </div>
        <div>
          <AiOutlineDelete
            className="icon"
            onClick={() => handleCompletedTodoDelete (index)}
          />
        </div>
      </div>
    ))}
</div>
</div>
</div>
  )
}

export default Home