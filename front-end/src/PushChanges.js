import React from 'react';
 
 
const PushChanges = ({sendGoalList}) => {
   return (
       <div>
           <button style={{margin: '20px'}} onClick={sendGoalList}>Push Changes</button>
       </div>
   );
};
 
export default PushChanges;