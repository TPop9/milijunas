import Jokers from './Jokers';
import Questions from './Questions';
import { getCorrectAnswerProbability, getDifficulty, getRandomIndices, getRandomPercentages, giveCorrectAnswer } from '../helper';
import questionsJson from "../questions"
import { useState } from 'react';

const initialIndex = Math.floor(Math.random() * questionsJson["easy"].length)
const initialsJokers = {
  halfHalf: true,
  askTheAudience: true,
  callAFriend: true,
};

function Game({questionNumber, setQuestionNumber, setGameActive}){
  const [jokers, setJokers] = useState(initialsJokers);
  
  const [questions, setQuestions] = useState(questionsJson);
  const [removedQuestions, setRemovedQuestions] = useState(null)
  const [questionIndex, setQuestionIndex] = useState(initialIndex);
  const [answerIndices, setAnswerIndices] = useState(getRandomIndices());
  

  const difficulty = getDifficulty(questionNumber);
  const question = questions[difficulty][questionIndex];
  

  function takeHalfHalf(){
    if(!jokers.halfHalf){
      return;
    }
    setJokers((jokers)=>({...jokers, halfHalf: false}))
    setRemovedQuestions([2,3]);
  }

  function takeAskTheAudience(){
    if(!jokers.askTheAudience){
      return;
    }
    setJokers((jokers)=>({...jokers, askTheAudience: false}))
    const correctAnswerProbability = getCorrectAnswerProbability(difficulty)
    const willGiveCorrect = giveCorrectAnswer(correctAnswerProbability);
    const filteredIndices = answerIndices.filter(answerIndex=>{
      if(removedQuestions && removedQuestions.includes(answerIndex)){
        return false
      }

      return true;
    })

    const  {percentages, highestNumber} = getRandomPercentages(filteredIndices.length)
    let result = "Publika je odabrala ovako: \n\n";

    if(!willGiveCorrect){
      percentages.push(highestNumber)
    }

    for(let i = 0; i < filteredIndices.length; i++){

      const index = filteredIndices[i];
      let percent = 0;
      if(willGiveCorrect && index === 0){
        percent = highestNumber;
      }else{
        
        const randIndex = Math.floor(Math.random()*percentages.length);
        percent = percentages[randIndex];
        percentages.splice(randIndex, 1);
      
      }
      
      result+= `${question.answers[index]}: ${percent}%\n`;
    }
    

    alert(result);


  }

  function takeCallAFriend(){
    if(!jokers.callAFriend){
      return;
    }
    setJokers((jokers)=>({...jokers, callAFriend: false}))

    const correctAnswerProbability = getCorrectAnswerProbability(difficulty)
    const willGiveCorrect = giveCorrectAnswer(correctAnswerProbability);
    let message = "Mislim da je odgovor:\n\n";
    let probableAnswerIndex = 0;
    if(!willGiveCorrect){
      probableAnswerIndex = jokers.halfHalf ? Math.floor(Math.random() * 3)+1 : 1; 
    }
    const answerIndex = answerIndices.findIndex(index=>index===probableAnswerIndex);
      const letter = String.fromCharCode(answerIndex+65);
      const answer = question.answers[probableAnswerIndex];
      message+=(letter+": ");
      message+=answer;
      alert(message);

    

  }

  function handleRestart(){
    setQuestions(questionsJson);
    setJokers(initialsJokers)
    setGameActive(false);
  }   
  
  return (
    <div className="Millionaire">
      
        <Questions
          removedQuestions={removedQuestions}
          questions={questions}
          questionIndex={questionIndex}
          difficulty={difficulty}
          questionNumber={questionNumber}
          handleRestart={handleRestart}
          setQuestions={setQuestions}
          setRemovedQuestions={setRemovedQuestions}
          setQuestionIndex={setQuestionIndex}
          setAnswerIndices={setAnswerIndices}
          setQuestionNumber={setQuestionNumber}
          answerIndices={answerIndices}
        />
       <Jokers takeHalfHalf={takeHalfHalf} takeAskTheAudience={takeAskTheAudience} takeCallAFriend={takeCallAFriend} jokers={jokers}/>
    </div>
  );
}

export default Game;