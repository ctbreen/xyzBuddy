import React from 'react';
 
const Goal = ({goal, handleToggle}) => {
    const handleClick = (e) => {
        e.preventDefault()
        handleToggle(e.currentTarget.id)
    }

   return (
        <div id={goal.id} key={goal.id + goal.task} className={goal.complete ? "strikethrough" : ""} onClick={handleClick}>
           {goal.task}
        </div>
   );
};
 
export default Goal;