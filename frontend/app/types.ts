// Property type
export type PropertyName =
  | "Reflexivity"
  | "Irreflexivity"
  | "Symmetry"
  | "Asymmetry"
  | "Antisymmetry"
  | "Transitivity"
  | "Antitransitivity"
  | "Totality"
  | "Trichotomy";

// Category type
export type TypeName =
  | "Equivalence"
  | "Partial Order"
  | "Total Order"
  | "Strict Partial Order"
  | "Strict Total Order";

// Every property name
export const PROPERTY_NAMES: PropertyName[] = [
  "Reflexivity",
  "Irreflexivity",
  "Symmetry",
  "Asymmetry",
  "Antisymmetry",
  "Transitivity",
  "Antitransitivity",
  "Totality",
  "Trichotomy",
] as const;

// Every category name
export const OPERATION_NAMES = ["Inversion", "Composition"] as const;

// Checks if a string is a valid property name
export const isPropertyName = (name: string): name is PropertyName =>
  PROPERTY_NAMES.includes(name as PropertyName);
