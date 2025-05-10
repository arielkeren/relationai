import {
  enforceAntisymmetry,
  enforceIrreflexivity,
  enforceReflexivity,
  enforceSymmetry,
  enforceTotality,
  enforceTransitivity,
  enforceTrichotomy,
} from "./propertyEnforcements";
import { TypeName } from "./types";

// Enforces the relation to be of a specific category
const enforceType = (relation: number[][], type: TypeName) => {
  // Determine which category to enforce
  switch (type) {
    case "Equivalence":
      enforceEquivalence(relation);
      break;
    case "Partial Order":
      enforcePartialOrder(relation);
      break;
    case "Total Order":
      enforceTotalOrder(relation);
      break;
    case "Strict Partial Order":
      enforceStrictPartialOrder(relation);
      break;
    case "Strict Total Order":
      enforceStrictTotalOrder(relation);
      break;
  }
};

// Enforces the relation to be an equivalence relation
const enforceEquivalence = (relation: number[][]) => {
  enforceReflexivity(relation);
  enforceSymmetry(relation);
  enforceTransitivity(relation);
};

// Enforces the relation to be a partial order
const enforcePartialOrder = (relation: number[][]) => {
  enforceReflexivity(relation);
  enforceTransitivity(relation);
  enforceAntisymmetry(relation);
};

// Enforces the relation to be a total order
const enforceTotalOrder = (relation: number[][]) => {
  enforceReflexivity(relation);
  enforceTotality(relation);
  enforceTransitivity(relation);
  enforceAntisymmetry(relation);
};

// Enforces the relation to be a strict partial order
const enforceStrictPartialOrder = (relation: number[][]) => {
  enforceIrreflexivity(relation);
  enforceTransitivityWithIrreflexivity(relation);
};

// Enforces the relation to be a strict total order
const enforceStrictTotalOrder = (relation: number[][]) => {
  enforceIrreflexivity(relation);
  enforceTrichotomy(relation);
  enforceTransitivityWithIrreflexivity(relation);
};

// Enforces transitivity while keeping irreflexivity
const enforceTransitivityWithIrreflexivity = (relation: number[][]) => {
  // This holds whether the relation is changed or not during an iteration
  let isChanged = true;

  // Keep iterating until no changes are made
  while (isChanged) {
    isChanged = false;

    // Iterate through the relation
    for (let i = 0; i < relation.length; i++)
      for (let j = 0; j < relation[i].length; j++)
        for (let k = 0; k < relation[j].length; k++)
          // Check if this does not satisfy transitivity
          if (relation[i][j] && relation[j][k] && !relation[i][k]) {
            // Keep the relation irreflexive
            if (i === k) relation[i][j] = 0;
            // Satisfy transitivity
            else relation[i][k] = 1;
            // Mark that the relation has changed
            isChanged = true;
          }
  }
};

export default enforceType;
