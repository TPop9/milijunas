export function getDifficulty(questionNumber){
    if(questionNumber <6) {
        return "easy"
    } 
    if(questionNumber >=6 && questionNumber<11){
        return "medium"
    } 
    return "hard"
}

export function getRandomIndices(){
    let indices = [0,1,2,3];
    const answerIndices = [];
    for(let i = 0; i < 4; ++i){
      const index = indices[Math.floor(Math.random() * indices.length)];
      answerIndices.push(index)
      indices = indices.filter((value)=>value!==index)
    }

    return answerIndices;
}


export function getCorrectAnswerProbability(difficulty){
    if (difficulty === "easy") {
        return 100
    }
    if (difficulty === "medium") {
        return 80
    }
    return 50
}

export function getRandomPercentages(answerLength){
    console.log(answerLength);
    let sum = 100;
    const result = [];
    let highestIndex = 0;
    let highestNumber = 0;

    for(let i = 0; i <answerLength-1; i++){
        const num = Math.floor(Math.random()*(sum+1));
        if(num > highestNumber){
            highestNumber = num;
            highestIndex = i;
        }

        result.push(num);
        sum -= num;
    }
    result.push(sum);
    if(sum > highestNumber){
        highestNumber = sum;
        highestIndex = answerLength-1;
    }
    result.splice(highestIndex, 1);
    return {percentages: result, highestNumber};
} 

export function giveCorrectAnswer(probability) {
    if(probability === 100){
        return true;
    }
    
    const num = Math.floor(Math.random()*100 + 1)
    
    return probability > num;
}