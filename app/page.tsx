"use client";

import { useEffect, useState } from "react";
import Properties from "./components/Predictions";
import Relation from "./components/Relation";
import RelationButtons from "./components/RelationButtons";
import { isPropertyName, PropertyName, TypeName } from "./types";
import enforceProperty from "./propertyEnforcements";
import enforceType from "./typeEnforcements";

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

  const setIdentityRelation = () => {
    const identity = JSON.parse(
      JSON.stringify(Array(5).fill(Array(5).fill(0)))
    );

    for (let i = 0; i < identity.length; i++) identity[i][i] = 1;

    setRelation(identity);
  };

  const invertRelation = () => {
    const relationCopy = JSON.parse(JSON.stringify(relation));

    for (let i = 0; i < relationCopy.length; i++) {
      for (let j = i + 1; j < relationCopy[i].length; j++) {
        const temp = relationCopy[i][j];
        relationCopy[i][j] = relationCopy[j][i];
        relationCopy[j][i] = temp;
      }
    }

    setRelation(relationCopy);
  };

  const squareRelation = () => {
    const relationCopy = JSON.parse(JSON.stringify(relation));

    for (let i = 0; i < relationCopy.length; i++) {
      for (let j = 0; j < relationCopy[i].length; j++) {
        for (let k = 0; k < relationCopy.length; k++) {
          relationCopy[i][k] =
            relationCopy[i][j] || (relationCopy[i][j] && relationCopy[j][k]);
        }
      }
    }

    setRelation(relationCopy);
  };

  const randomizeRelation = () =>
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

  useEffect(() => {
    randomizeRelation();
  }, []);

  const modifyRelation = (property: PropertyName | TypeName) => {
    const relationCopy = JSON.parse(JSON.stringify(relation));
    if (isPropertyName(property)) enforceProperty(relationCopy, property);
    else enforceType(relationCopy, property);
    setRelation(relationCopy);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-1 gap-10 p-10 select-none min-[760px]:grid-cols-2 min-[1120px]:grid-cols-3">
        <div className="flex flex-col justify-center gap-2">
          <Relation relation={relation} togglePair={togglePair} />
          <RelationButtons
            toggleAllOn={toggleAllOn}
            toggleAllOff={toggleAllOff}
            setIdentityRelation={setIdentityRelation}
            invertRelation={invertRelation}
            squareRelation={squareRelation}
            randomizeRelation={randomizeRelation}
          />
        </div>
        <Properties relation={relation} modifyRelation={modifyRelation} />
      </div>
    </div>
  );
};

export default Home;
