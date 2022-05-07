import { getRandomIndices, getDifficulty } from "../helper";


function Questions({
    removedQuestions, 
    questions, 
    questionIndex,
    questionNumber,
    handleRestart,
    setQuestions,
    setRemovedQuestions,
    setQuestionIndex,
    setAnswerIndices,
    setQuestionNumber,
    answerIndices
}) {
    const difficulty = getDifficulty(questionNumber);
    const question = questions[difficulty][questionIndex];
    function handleClick(index){

        if(removedQuestions && removedQuestions.includes(index)){
          return;
        }
        
        
        if(index === 0){
          alert("Točan odgovor!")
    
          const newQuestions = JSON.parse(JSON.stringify(questions))
          newQuestions[difficulty].splice(questionIndex, 1)
          setQuestions(newQuestions)
          setRemovedQuestions(null);
          const newIndex = Math.floor(Math.random() * newQuestions[getDifficulty(questionNumber+1)].length);
          setQuestionIndex(newIndex);
          setAnswerIndices(getRandomIndices());
          if (questionNumber === 15){
            alert("Čestitamo, osvojili ste 1 000 000kn")
            handleRestart();
          }
          setQuestionNumber((questionNumber) => questionNumber + 1)
    
          return;
        } 
        alert("Žao nam je, odgovor je pogrešan!")
        
        handleRestart();
        
      } 

    function isRemoved(index){
        if(!removedQuestions){
          return "";
        }
        const removed = removedQuestions.includes(index) ? "removed" : "";
        return removed
      }

    return (
        <>
            <div className='question'>
                {questionNumber}. {question.question}
            </div>
            <div className='answer-container'>
                <div onClick={() => handleClick(answerIndices[0])} className={`answer left ${isRemoved(answerIndices[0])}`}>A: {question.answers[answerIndices[0]]}</div>
                <div onClick={() => handleClick(answerIndices[1])} className={`answer ${isRemoved(answerIndices[1])}`}>B: {question.answers[answerIndices[1]]}</div>
            </div>
            <div className='answer-container'>
                <div onClick={() => handleClick(answerIndices[2])} className={`answer left ${isRemoved(answerIndices[2])}`}>C: {question.answers[answerIndices[2]]}</div>
                <div onClick={() => handleClick(answerIndices[3])} className={`answer ${isRemoved(answerIndices[3])}`}>D: {question.answers[answerIndices[3]]}</div>
            </div>
        </>
    )
}


export default Questions;