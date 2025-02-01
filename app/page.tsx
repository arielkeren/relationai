"use client";

import { useEffect, useState } from "react";
import Predictions from "./components/Predictions";
import Relation from "./components/Relation";
import RelationButtons from "./components/RelationButtons";
import { isPropertyName, PropertyName, TypeName } from "./types";
import enforceProperty from "./propertyEnforcements";
import enforceType from "./typeEnforcements";
import useModels from "./hooks/useModels";
import LoadingPopup from "./components/LoadingPopup";
import {
  getIdentityArray,
  getOnesArray,
  getRandomArray,
  getZerosArray,
} from "./operations";
import CalculatingPopup from "./components/CalculatingPopup";

const Home: React.FC = () => {
  const [relation, setRelation] = useState(Array(5).fill(Array(5).fill(1)));
  const {
    isLoading,
    isCalculating,
    predictProperties,
    predictInversion,
    predictComposition,
  } = useModels();

  const togglePair = (i: number, j: number) => {
    const relationCopy = JSON.parse(JSON.stringify(relation));
    relationCopy[i][j] = 1 - relationCopy[i][j];
    setRelation(relationCopy);
  };

  const toggleAllOn = () => setRelation(getOnesArray());

  const toggleAllOff = () => setRelation(getZerosArray());

  const setIdentityRelation = () => setRelation(getIdentityArray());

  const randomizeRelation = () => setRelation(getRandomArray());

  const invertRelation = async () =>
    setRelation(await predictInversion(relation));

  const composeRelation = async () =>
    setRelation(await predictComposition(relation));

  const modifyRelation = (property: PropertyName | TypeName) => {
    const relationCopy = JSON.parse(JSON.stringify(relation));
    if (isPropertyName(property)) enforceProperty(relationCopy, property);
    else enforceType(relationCopy, property);
    setRelation(relationCopy);
  };

  useEffect(() => {
    randomizeRelation();
  }, []);

  return (
    <>
      {isLoading && <LoadingPopup />}
      {isCalculating && <CalculatingPopup />}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-10 p-10 select-none min-[760px]:grid-cols-2 min-[1120px]:grid-cols-3">
          <div className="flex flex-col justify-center gap-2">
            <Relation relation={relation} togglePair={togglePair} />
            <RelationButtons
              toggleAllOn={toggleAllOn}
              toggleAllOff={toggleAllOff}
              setIdentityRelation={setIdentityRelation}
              invertRelation={invertRelation}
              composeRelation={composeRelation}
              randomizeRelation={randomizeRelation}
            />
          </div>
          <Predictions
            relation={relation}
            predictProperties={predictProperties}
            modifyRelation={modifyRelation}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
