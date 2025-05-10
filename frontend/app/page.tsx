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

// Homepage component
const Home: React.FC = () => {
  // State to manage the relation matrix, initialized to the full relation
  const [relation, setRelation] = useState(Array(5).fill(Array(5).fill(1)));
  // Get the models and their current state
  const {
    isLoading,
    isCalculating,
    predictProperties,
    predictInversion,
    predictComposition,
  } = useModels();

  // Toggles a specific pair in the relation
  const togglePair = (i: number, j: number) => {
    // Create a deep copy of the relation to avoid mutating the state directly
    const relationCopy = JSON.parse(JSON.stringify(relation));
    // Toggle the value of the pair (i, j)
    relationCopy[i][j] = 1 - relationCopy[i][j];
    // Update the state with the modified relation
    setRelation(relationCopy);
  };

  // Sets all pairs in the relation to 1 (full relation)
  const toggleAllOn = () => setRelation(getOnesArray());

  // Sets all pairs in the relation to 0 (empty relation)
  const toggleAllOff = () => setRelation(getZerosArray());

  // Sets the relation to the identity relation (main diagonal is set to 1)
  const setIdentityRelation = () => setRelation(getIdentityArray());

  // Sets the relation to a random relation
  const randomizeRelation = () => setRelation(getRandomArray());

  // Changes the relation to the predicted inversion of it
  const invertRelation = async () =>
    setRelation(await predictInversion(relation));

  // Changes the relation to the predicted composition of it with itself
  const composeRelation = async () =>
    setRelation(await predictComposition(relation));

  // Modifies the relation to enforce a specific property or category
  const modifyRelation = (property: PropertyName | TypeName) => {
    // Create a deep copy of the relation to avoid mutating the state directly
    const relationCopy = JSON.parse(JSON.stringify(relation));
    // If it is a property, enforce it
    if (isPropertyName(property)) enforceProperty(relationCopy, property);
    // Otherwise, enforce the category
    else enforceType(relationCopy, property);
    // Update the state with the modified relation
    setRelation(relationCopy);
  };

  // Randomize the relation when the component mounts
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
