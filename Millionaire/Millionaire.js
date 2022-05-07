import './millionaire.css';
import Game from "./components/Game"
import ResetScreen from './components/ResetScreen';
import {useState} from "react"


function Millionaire({dodajUHighscore, username}) {
  const [questionNumber, setQuestionNumber] = useState(1)
  const [gameActive, setGameActive] = useState(true)

  return gameActive ? 
  <Game 
    setGameActive={setGameActive}
    questionNumber={questionNumber} 
    setQuestionNumber={setQuestionNumber}/> : 
    
  <ResetScreen 
    questionNumber={questionNumber}
    setQuestionNumber={setQuestionNumber}
    dodajUHighscore={dodajUHighscore}
    username={username}
    setGameActive={setGameActive}
    />
}

export default Millionaire;
