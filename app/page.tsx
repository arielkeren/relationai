"use client";

import { useState } from "react";
import Properties from "./components/Predictions";
import Relation from "./components/Relation";
import RelationButtons from "./components/RelationButtons";

const Home = () => {
  const [relation, setRelation] = useState(Array(5).fill(Array(5).fill(1)));

  const togglePair = (i: number, j: number) => {
    const relationCopy = JSON.parse(JSON.stringify(relation));
    relationCopy[i][j] = 1 - relationCopy[i][j];
    setRelation(relationCopy);
  };

  const toggleAllOn = () =>
    setRelation(JSON.parse(JSON.stringify(Array(5).fill(Array(5).fill(1)))));

  const toggleAllOff = () =>
    setRelation(JSON.parse(JSON.stringify(Array(5).fill(Array(5).fill(0)))));

  const toggleRandom = () =>
    setRelation(
      JSON.parse(
        JSON.stringify(
          Array(5)
            .fill(0)
            .map(() =>
              Array(5)
                .fill(0)
                .map(() => Math.round(Math.random()))
            )
        )
      )
    );

  return (
    <div className="flex flex-col items-center gap-2 p-10">
      <Relation relation={relation} togglePair={togglePair} />
      <RelationButtons
        toggleAllOn={toggleAllOn}
        toggleAllOff={toggleAllOff}
        toggleRandom={toggleRandom}
      />
      <Properties relation={relation} />
    </div>
  );
};

export default Home;
