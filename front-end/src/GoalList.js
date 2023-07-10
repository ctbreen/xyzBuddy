import React from 'react';
import Goal from './Goal';
 
 
const GoalList = ({goalList, handleToggle, handleFilter}) => {
   return (
    <div>
        <b>Goal List</b>
        <p></p>
        <div>
            {goalList.map(goal => {
                return (
                   <Goal goal={goal} handleToggle={handleToggle} handleFilter={handleFilter}/>
                )
            })}
            <button style={{margin: '20px'}} onClick={handleFilter}>Clear Completed</button>
        </div>
    </div>
   );
};
 
export default GoalList;