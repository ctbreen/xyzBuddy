import React, { useEffect, useState } from 'react';
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
 
function App() {
  const [ goalList, setGoalList ] = useState([{}]);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
      let userId = isAuthenticated ? user.sub : "None";
      fetch(`/list?userId=${userId}`)
        .then(response => response.json())
        .then(goalList => setGoalList(goalList))
        .catch(error => console.log(error));
  }, [user]);

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
    const jsonData = JSON.stringify(goalList);
    fetch('/send/json', {
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