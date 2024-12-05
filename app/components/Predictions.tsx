import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Property from "./Property";
import Type from "./Type";

type Props = {
  relation: number[][];
};

const Predictions: React.FC<Props> = ({ relation }) => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [predictions, setPredictions] = useState<number[]>(Array(6).fill(0));

  useEffect(() => {
    const loadModel = async () => {
      try {
        const model = await tf.loadLayersModel("/model/model.json");
        setModel(model);
      } catch (error) {
        alert(error);
      }
    };

    loadModel();
  }, []);

  useEffect(() => {
    const makePrediction = async () => {
      if (!model) return;

      const input = tf.tensor(relation).reshape([1, 5, 5, 1]);
      const result = model.predict(input);

      const reflexivity = await (result as any)[0].array();
      const symmetry = await (result as any)[1].array();
      const transitivity = await (result as any)[2].array();
      const antiReflexivity = await (result as any)[2].array();
      const antiSymmetry = await (result as any)[2].array();
      const antiTransitivity = await (result as any)[2].array();

      setPredictions([
        reflexivity[0],
        symmetry[0],
        transitivity[0],
        antiReflexivity[0],
        antiSymmetry[0],
        antiTransitivity[0],
      ]);
    };

    makePrediction();
  }, [model, relation]);

  return (
    <div>
      <div>
        <Property name="Reflexivity" prediction={predictions[0]} />
        <Property name="Symmetry" prediction={predictions[1]} />
        <Property name="Transitivity" prediction={predictions[2]} />
        <Property name="Anti-Reflexivity" prediction={predictions[3]} />
        <Property name="Anti-Symmetry" prediction={predictions[4]} />
        <Property name="Anti-Transitivity" prediction={predictions[5]} />
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
  );
};

export default Predictions;
