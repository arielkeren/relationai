import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Property from "./Property";
import Type from "./Type";
import LoadingPopup from "./LoadingPopup";
import { PROPERTY_NAMES, PropertyName, TypeName } from "../types";

type Props = {
  relation: number[][];
  modifyRelation: (property: PropertyName | TypeName) => void;
};

const Predictions: React.FC<Props> = ({ relation, modifyRelation }) => {
  const [models, setModels] = useState<tf.LayersModel[] | null>(null);
  const [predictions, setPredictions] = useState<number[]>(Array(9).fill(0));

  useEffect(() => {
    const loadModels = async () => {
      setModels(
        await Promise.all(
          PROPERTY_NAMES.map(property =>
            tf.loadLayersModel(`/models/${property.toLowerCase()}/model.json`)
          )
        )
      );
    };

    loadModels();
  }, []);

  useEffect(() => {
    const makePrediction = async () => {
      if (!models) return;

      const input = tf.tensor(relation).reshape([1, 25]);
      const results = models.map(model => model.predict(input));

      const newPredictions = [];

      for (const result of results) {
        const prediction = await (result as any).array();
        newPredictions.push(prediction);
      }

      setPredictions(newPredictions);
    };

    makePrediction();
  }, [models, relation]);

  return (
    <>
      {!models && <LoadingPopup />}
      <div className="flex flex-col gap-5 w-[332px]">
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
        <div className="flex flex-col gap-2">
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
      </div>
    </>
  );
};

export default Predictions;
