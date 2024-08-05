import React, {useState} from 'react'
import './App.css'
import MainPage from './MainPage.jsx';
import MainQuiz from './MainQuiz.jsx';

function App() {
  const [quizStarted, setQuizStarted] = useState(false)

  return (
    <>
     {quizStarted ? ( <MainQuiz /> 
     ) : ( <MainPage startQuiz={ () => setQuizStarted(true)}/>
     )}
    </>
  );
}

export default App
