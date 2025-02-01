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

export type TypeName =
  | "Equivalence"
  | "Partial Order"
  | "Total Order"
  | "Strict Partial Order"
  | "Strict Total Order";

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

export const OPERATION_NAMES = ["Inversion", "Composition"] as const;

export const isPropertyName = (name: string): name is PropertyName =>
  PROPERTY_NAMES.includes(name as PropertyName);
