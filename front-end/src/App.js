import React, { useEffect, useState, useRef } from 'react';
//import data from "./data.json";
//components
import Header from "./Header";
import GoalList from "./GoalList";
import PushChanges from "./PushChanges"
import InputForm from "./InputForm"
import LoginButton from "./LoginButton"
import LogoutButton from "./LogoutButton"
import Profile from './Profile';
import { useAuth0 } from "@auth0/auth0-react";
 
import './App.css';

function useDebounce(value, customDelay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, customDelay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, customDelay]);

  return debouncedValue;
}

 
function App() {
  const [ goalList, setGoalList ] = useState([{}]);
  const { user, isAuthenticated } = useAuth0();

  const debouncedIsAuthenticated = useDebounce(isAuthenticated, 30);

  useEffect(() => {
      let userId = isAuthenticated ? user.sub : "None";
      console.log(isAuthenticated)
      console.log(userId)
      fetch(`/list?userId=${userId}`)
        .then(response => response.json())
        .then(goalList => setGoalList(goalList))
        .catch(error => console.log(error));
  }, [debouncedIsAuthenticated]);

  const handleToggle = (id) => {
    let mapped = goalList.map(task => {
      return task.id == id ? { ...task, complete: !task.complete } : { ...task};
    });
    setGoalList(mapped);
  }
  const handleFilter = () => {
    let filtered = goalList.filter(task => {
      return !task.complete;
    });
    setGoalList(filtered);
  }

  const sendGoalList = () => {
    let userId = isAuthenticated ? user.sub : "None";
    const jsonData = JSON.stringify(goalList);
    fetch(`/send/json?userId=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    })
      .catch(error => {
        console.error(error);
      });
  };
 
 return (
   <div className="App">
      <div class="box-top">
        <div class="box-top-left"><Profile/></div>
        <div class="box-top-center"><Header/></div>
        <div class="box-top-right"><LoginButton/>
        <LogoutButton/></div>
      </div>
      <div className='ListMods'>
        <div className="GoalList">
          <GoalList goalList={goalList} handleToggle = {handleToggle} handleFilter={handleFilter}/>
        </div>
        <div className='InputForm'>
          <InputForm goalList={goalList} setGoalList={setGoalList}/>
        </div>
      </div>
      <div className='PushChanges'>
        <PushChanges sendGoalList= {sendGoalList}/>
      </div>
   </div>
 );
}
 
export default App;