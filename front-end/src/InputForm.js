import React, {useState} from 'react';

const InputForm = ({goalList, setGoalList}) => {
    const [task1, setTask1] = useState('');
    const [completedStatus, setCompletedStatus] = useState('');

    const inputChanges1 = (event1) => {
        setTask1(event1.target.value);
    };
    const inputChanges2 = (event2) => {
        setCompletedStatus(event2.target.value);
    };
    const changeList = () => {
        if (task1 !== ""){
            let completed;
            if (completedStatus === "false"){
                completed = false;
            } else if (completedStatus === "true"){
                completed = true;
            } else{
                completed = false;
            };
            if (goalList.length > 0){
                let thisId = goalList[goalList.length - 1]["id"] + 1;
                let newItem = [{"complete": completed, "id":thisId, "task": task1}];
                let newList = goalList.concat(newItem);
                console.log(newList);
                setGoalList(newList);
            } else{
                let thisId = 1;
                let newList = [{"complete": completed, "id":thisId, "task": task1}];
                console.log(newList);
                setGoalList(newList);
            }

            setTask1("");
            setCompletedStatus("");
        };
    };

    return (
        <div>
            <b>Create A New Goal</b>
            <p>Write the task here:</p>
            <input value={task1} onChange={inputChanges1} />
            <p>Write the completion status (either "true" or "false"- default is "false"):</p>
            <input value={completedStatus} onChange={inputChanges2} />
            <div>
                <button onClick={changeList}>Add Task</button>
            </div>
        </div>
    );
 };
  
 export default InputForm;