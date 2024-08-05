import React from 'react' 
import './App.css';


function MainPage({startQuiz}) {
    return (
        <>
       
            <div className="container">
             <h1> Quizzical </h1>
             <h2> A Game of Knowledge </h2>
             <button onClick={startQuiz}> Start Quiz </button>
            </div>
  
        </>
    )
}

export default MainPage;
