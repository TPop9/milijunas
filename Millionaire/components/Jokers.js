import { useState } from "react";

function Jokers({ takeHalfHalf, takeAskTheAudience, takeCallAFriend, jokers }) {
 

  const handleUseJoker = (joker) => {
    if (!jokers[joker]) {
      return;
    }

    if (joker === "halfHalf") {
      takeHalfHalf();
    }

    if (joker === "askTheAudience") {
      takeAskTheAudience();
    }

    if (joker === "callAFriend") {
      takeCallAFriend();
    }

  };

  return (
    <div className="jokerContainer">
      <div
        onClick={() => handleUseJoker("halfHalf")}
        className={`joker ${jokers.halfHalf ? "" : "usedJoker"}`}
      >
        50:50
      </div>
      <div
        onClick={() => handleUseJoker("askTheAudience")}
        className={`joker ${jokers.askTheAudience ? "" : "usedJoker"}`}
      >
        Pitaj publiku
      </div>
      <div
        onClick={() => handleUseJoker("callAFriend")}
        className={`joker ${jokers.callAFriend ? "" : "usedJoker"}`}
      >
        Zovi čovika
      </div>
    </div>
  );
}

export default Jokers;
