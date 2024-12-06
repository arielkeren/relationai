import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Property from "./Property";
import Type from "./Type";
import LoadingPopup from "./LoadingPopup";

const PROPERTIES = [
  "Reflexivity",
  "Symmetry",
  "Transitivity",
  "Anti-Reflexivity",
  "Anti-Symmetry",
  "Anti-Transitivity",
];

type Props = {
  relation: number[][];
};

const Predictions: React.FC<Props> = ({ relation }) => {
  const [models, setModels] = useState<tf.LayersModel[] | null>(null);
  const [predictions, setPredictions] = useState<number[]>(Array(6).fill(0));

  useEffect(() => {
    const loadModels = async () => {
      const reflexivity = await tf.loadLayersModel(
        "/models/reflexivity/model.json"
      );
      const symmetry = await tf.loadLayersModel("/models/symmetry/model.json");
      const transitivity = await tf.loadLayersModel(
        "/models/transitivity/model.json"
      );
      const antireflexivity = await tf.loadLayersModel(
        "/models/antireflexivity/model.json"
      );
      const antisymmetry = await tf.loadLayersModel(
        "/models/antisymmetry/model.json"
      );
      const antitransitivity = await tf.loadLayersModel(
        "/models/antitransitivity/model.json"
      );

      setModels([
        reflexivity,
        symmetry,
        transitivity,
        antireflexivity,
        antisymmetry,
        antitransitivity,
      ]);
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
      <div>
        <div className="flex flex-col gap-1 w-[332px]">
          {predictions.map((prediction, index) => (
            <Property
              key={index}
              name={PROPERTIES[index]}
              prediction={prediction}
            />
          ))}
        </div>
        <div>
          <Type
            name="Equivalence"
            dependencies={[predictions[0], predictions[1], predictions[2]]}
          />
          <Type
            name="Strict Partial Order"
            dependencies={[predictions[2], predictions[3]]}
          />
        </div>
      </div>
    </>
  );
};

export default Predictions;
