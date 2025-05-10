import { useEffect, useState } from "react";
import Property from "./Property";
import Type from "./Type";
import { PROPERTY_NAMES, PropertyName, TypeName } from "../types";

type Props = {
  relation: number[][];
  predictProperties: (relation: number[][]) => Promise<number[]>;
  modifyRelation: (property: PropertyName | TypeName) => void;
};

const Predictions: React.FC<Props> = ({
  relation,
  predictProperties,
  modifyRelation,
}) => {
  const [predictions, setPredictions] = useState<number[]>(Array(9).fill(0));

  useEffect(() => {
    const makePrediction = async () =>
      setPredictions((await predictProperties(relation))!);

    makePrediction();
  }, [predictProperties, relation]);

  return (
    <>
      <div className="flex flex-col gap-1">
        {predictions.map((prediction, index) => (
          <Property
            key={index}
            name={PROPERTY_NAMES[index]}
            prediction={prediction}
            modifyRelation={modifyRelation}
          />
        ))}
      </div>
      <div className="flex flex-col justify-center gap-2">
        <Type
          name="Equivalence"
          dependencyNames={["Reflexivity", "Symmetry", "Transitivity"]}
          dependencyPredictions={[
            predictions[0],
            predictions[2],
            predictions[5],
          ]}
          modifyRelation={modifyRelation}
        />
        <Type
          name="Partial Order"
          dependencyNames={["Reflexivity", "Antisymmetry", "Transitivity"]}
          dependencyPredictions={[
            predictions[0],
            predictions[4],
            predictions[5],
          ]}
          modifyRelation={modifyRelation}
        />
        <Type
          name="Total Order"
          dependencyNames={[
            "Reflexivity",
            "Antisymmetry",
            "Transitivity",
            "Totality",
          ]}
          dependencyPredictions={[
            predictions[0],
            predictions[4],
            predictions[5],
            predictions[7],
          ]}
          modifyRelation={modifyRelation}
        />
        <Type
          name="Strict Partial Order"
          dependencyNames={["Irreflexivity", "Transitivity"]}
          dependencyPredictions={[predictions[1], predictions[5]]}
          modifyRelation={modifyRelation}
        />
        <Type
          name="Strict Total Order"
          dependencyNames={["Irreflexivity", "Transitivity", "Trichotomy"]}
          dependencyPredictions={[
            predictions[1],
            predictions[5],
            predictions[8],
          ]}
          modifyRelation={modifyRelation}
        />
      </div>
    </>
  );
};

export default Predictions;
