// Returns the empty 5x5 relation
export const getZerosArray = () => [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

// Returns the full 5x5 relation
export const getOnesArray = () => [
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
];

// Returns the identity 5x5 relation
export const getIdentityArray = () => [
  [1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1],
];

// Returns a random 5x5 relation
export const getRandomArray = () =>
  getZerosArray().map(row => row.map(() => Math.round(Math.random())));
