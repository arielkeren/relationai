import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

type Props = {
  relation: number[][];
};

const Properties: React.FC<Props> = ({ relation }) => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [predictions, setPredictions] = useState<number[]>([0, 0, 0]);

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

      const input = tf.tensor(relation).reshape([1, 25]);
      const result = model.predict(input);

      const reflexivity = await (result as any)[0].array();
      const symmetry = await (result as any)[1].array();
      const transitivity = await (result as any)[2].array();

      setPredictions([reflexivity[0], symmetry[0], transitivity[0]]);
    };

    makePrediction();
  }, [model, relation]);

  return (
    <div>
      {predictions && (
        <div>
          <p>{predictions}</p>
          <p>Reflexivity: {predictions[0] >= 0.5 ? "Yes" : "No"}</p>
          <p>Symmetry: {predictions[1] >= 0.5 ? "Yes" : "No"}</p>
          <p>Transitivity: {predictions[2] >= 0.5 ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default Properties;
