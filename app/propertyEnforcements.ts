import { PropertyName } from "./types";

const enforceProperty = (relation: number[][], property: PropertyName) => {
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

const enforceReflexivity = (relation: number[][]) => {
  for (let i = 0; i < relation.length; i++) relation[i][i] = 1;
};

const enforceIrreflexivity = (relation: number[][]) => {
  for (let i = 0; i < relation.length; i++) relation[i][i] = 0;
};

const enforceSymmetry = (relation: number[][]) => {
  for (let i = 0; i < relation.length; i++)
    for (let j = 0; j < relation[i].length; j++)
      if (relation[i][j]) relation[j][i] = 1;
};

const enforceAsymmetry = (relation: number[][]) => {
  for (let i = 0; i < relation.length; i++)
    for (let j = 0; j < relation[i].length; j++)
      if (relation[i][j]) relation[j][i] = 0;
};

const enforceAntisymmetry = (relation: number[][]) => {
  for (let i = 0; i < relation.length; i++)
    for (let j = 0; j < relation[i].length; j++)
      if (i !== j && relation[i][j]) relation[j][i] = 0;
};

const enforceTransitivity = (relation: number[][]) => {
  for (let i = 0; i < relation.length; i++)
    for (let j = 0; j < relation[i].length; j++)
      for (let k = 0; k < relation[j].length; k++)
        if (relation[i][j] && relation[j][k]) relation[i][k] = 1;
};

const enforceAntitransitivity = (relation: number[][]) => {
  for (let i = 0; i < relation.length; i++)
    for (let j = 0; j < relation[i].length; j++)
      for (let k = 0; k < relation[j].length; k++)
        if (relation[i][j] && relation[j][k]) relation[i][k] = 0;
};

const enforceTotality = (relation: number[][]) => {
  for (let i = 0; i < relation.length; i++)
    for (let j = 0; j < relation[i].length; j++)
      if (!relation[i][j] && !relation[j][i]) relation[i][j] = 1;
};

const enforceTrichotomy = (relation: number[][]) => {
  for (let i = 0; i < relation.length; i++)
    for (let j = 0; j < relation[i].length; j++)
      if (i !== j && !relation[i][j] && !relation[j][i]) relation[i][j] = 1;
};

export default enforceProperty;
