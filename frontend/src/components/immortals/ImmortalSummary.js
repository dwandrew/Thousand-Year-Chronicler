import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

export const ImmortalSummary = ({immortal}) => {
    const [likes, setCount] = useState(0)
let increaseCount = () =>{
    likes = likes +=1
    return likes

}
        return (
            <li>
                <Link to={"/immortals/" + immortal.id}>
                <div key= {immortal.id} className="immortal-card">
                <h4 className = "immortal-name"> {immortal.name}</h4>
                <p className = 'immortal-description'> {immortal.description}</p>
                <p>{likes}</p>
                </div>
                </Link>
                <button onClick={() => setCount(likes + 1)}> increase likes </button>
            </li>
        )
}

// import React, { useState, useEffect } from 'react';

// function Example() {
//   const [count, setCount] = useState(0);

//   // Similar to componentDidMount and componentDidUpdate:
//   useEffect(() => {
//     // Update the document title using the browser API
//     document.title = `You clicked ${count} times`;
//   });

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>
//         Click me
//       </button>
//     </div>
//   );
// }




export default ImmortalSummary
