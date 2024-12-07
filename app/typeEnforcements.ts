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

const enforceType = (relation: number[][], type: TypeName) => {
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

const enforceEquivalence = (relation: number[][]) => {
  enforceReflexivity(relation);
  enforceSymmetry(relation);
  enforceTransitivity(relation);
};

const enforcePartialOrder = (relation: number[][]) => {
  enforceReflexivity(relation);
  enforceTransitivity(relation);
  enforceAntisymmetry(relation);
};

const enforceTotalOrder = (relation: number[][]) => {
  enforceReflexivity(relation);
  enforceTotality(relation);
  enforceTransitivity(relation);
  enforceAntisymmetry(relation);
};

const enforceStrictPartialOrder = (relation: number[][]) => {
  enforceIrreflexivity(relation);
  enforceTransitivityWithIrreflexivity(relation);
};

const enforceStrictTotalOrder = (relation: number[][]) => {
  enforceIrreflexivity(relation);
  enforceTrichotomy(relation);
  enforceTransitivityWithIrreflexivity(relation);
};

const enforceTransitivityWithIrreflexivity = (relation: number[][]) => {
  let isChanged = true;

  while (isChanged) {
    isChanged = false;

    for (let i = 0; i < relation.length; i++)
      for (let j = 0; j < relation[i].length; j++)
        for (let k = 0; k < relation[j].length; k++)
          if (relation[i][j] && relation[j][k] && !relation[i][k]) {
            if (i === k) relation[i][j] = 0;
            else relation[i][k] = 1;
            isChanged = true;
          }
  }
};

export default enforceType;
