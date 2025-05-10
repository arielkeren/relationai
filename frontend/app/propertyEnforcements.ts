import { PropertyName } from "./types";

// Enforces the relation to satisfy a specific property
const enforceProperty = (relation: number[][], property: PropertyName) => {
  // Determine which property to enforce
  switch (property) {
    case "Reflexivity":
      enforceReflexivity(relation);
      break;
    case "Irreflexivity":
      enforceIrreflexivity(relation);
      break;
    case "Symmetry":
      enforceSymmetry(relation);
      break;
    case "Asymmetry":
      enforceAsymmetry(relation);
      break;
    case "Antisymmetry":
      enforceAntisymmetry(relation);
      break;
    case "Transitivity":
      enforceTransitivity(relation);
      break;
    case "Antitransitivity":
      enforceAntitransitivity(relation);
      break;
    case "Totality":
      enforceTotality(relation);
      break;
    case "Trichotomy":
      enforceTrichotomy(relation);
      break;
  }
};

// Enforces the relation to be reflexive
export const enforceReflexivity = (relation: number[][]) => {
  // Set the main diagonal to 1
  for (let i = 0; i < relation.length; i++) relation[i][i] = 1;
};

// Enforces the relation to be irreflexive
export const enforceIrreflexivity = (relation: number[][]) => {
  // Set the main diagonal to 0
  for (let i = 0; i < relation.length; i++) relation[i][i] = 0;
};

// Enforces the relation to be symmetric
export const enforceSymmetry = (relation: number[][]) => {
  // Loop over the relation
  for (let i = 0; i < relation.length; i++)
    for (let j = 0; j < relation[i].length; j++)
      // Ensure symmetry by also setting the flipped pair to 1
      if (relation[i][j]) relation[j][i] = 1;
};

// Enforces the relation to be asymmetric
const enforceAsymmetry = (relation: number[][]) => {
  // Loop over the relation
  for (let i = 0; i < relation.length; i++)
    for (let j = 0; j < relation[i].length; j++)
      // Ensure asymmetry by setting the flipped pair to 0
      if (relation[i][j]) relation[j][i] = 0;
};

// Enforces the relation to be antisymmetric
export const enforceAntisymmetry = (relation: number[][]) => {
  // Loop over the relation
  for (let i = 0; i < relation.length; i++)
    for (let j = 0; j < relation[i].length; j++)
      // Ensure antisymmetry by setting the flipped pair to 0, ignoring the main diagonal
      if (i !== j && relation[i][j]) relation[j][i] = 0;
};

// Enforces the relation to be transitive
export const enforceTransitivity = (relation: number[][]) => {
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
            // Satisfy transitivity
            relation[i][k] = 1;
            // Mark that the relation has changed
            isChanged = true;
          }
  }
};

// Enforces the relation to be antitransitive
const enforceAntitransitivity = (relation: number[][]) => {
  // Loop over the relation
  for (let i = 0; i < relation.length; i++)
    for (let j = 0; j < relation[i].length; j++)
      for (let k = 0; k < relation[j].length; k++)
        // Ensure antitransitivity by setting the necessary pair to 0
        if (relation[i][j] && relation[j][k]) relation[i][k] = 0;
};

// Enforces the relation to satisfy totality
export const enforceTotality = (relation: number[][]) => {
  // Loop over the relation
  for (let i = 0; i < relation.length; i++)
    for (let j = 0; j < relation[i].length; j++)
      // Ensure totality by setting one of the pairs to 1
      if (!relation[i][j] && !relation[j][i]) relation[i][j] = 1;
};

// Enforces the relation to satisfy trichotomy
export const enforceTrichotomy = (relation: number[][]) => {
  // Loop over the relation
  for (let i = 0; i < relation.length; i++)
    for (let j = 0; j < relation[i].length; j++)
      // Ensure trichotomy by setting one of the pairs to 1, ignoring the main diagonal
      if (i !== j && !relation[i][j] && !relation[j][i]) relation[i][j] = 1;
};

export default enforceProperty;
