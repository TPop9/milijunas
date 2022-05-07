import { func } from "prop-types";
import { useState } from "react";

function ResetScreen({dodajUHighscore, username, questionNumber, setQuestionNumber, setGameActive}){

    const message = questionNumber > 15 ? "Braaavo pobijedili ste!" :
    "Vaš rezultat je "+questionNumber;

    const [highscoreAdded, setHighscoreAdded] = useState(false);

    function handleNewGame() {
        setQuestionNumber(1)
        setGameActive(true)
    }

    function handleAddHighscore() {

        if(!highscoreAdded){

            dodajUHighscore("millionaireToniPoparic", {
                ime: username,
                rezultat: questionNumber > 15 ? 1000000 : questionNumber
            }, true)
            alert("Dodali ste rezultat");
            setHighscoreAdded(true);
            return;
        }


    }

    return <div>
        <h2 style={{textAlign:"center"}}>{message}</h2>
        <div className="answer-container">
        {!highscoreAdded &&
            <div onClick={handleAddHighscore} className="answer option">Dodaj u highscore</div>
        }
        <div className="answer option" onClick={handleNewGame}>Igraj ponovno</div>
        </div>
    </div>
}

export default ResetScreen;