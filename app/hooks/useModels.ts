import { useCallback, useEffect, useState } from "react";
import { LayersModel, loadLayersModel, tensor } from "@tensorflow/tfjs";
import { PROPERTY_NAMES, OPERATION_NAMES } from "../types";
import { getZerosArray } from "../operations";

const useModels = () => {
  const [propertyModels, setPropertyModels] = useState<LayersModel[] | null>(
    null
  );
  const [operationModels, setOperationModels] = useState<LayersModel[] | null>(
    null
  );
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      setPropertyModels(
        await Promise.all(
          PROPERTY_NAMES.map(property =>
            loadLayersModel(`/models/${property.toLowerCase()}/model.json`)
          )
        )
      );

      setOperationModels(
        await Promise.all(
          OPERATION_NAMES.map(operation =>
            loadLayersModel(`/models/${operation.toLowerCase()}/model.json`)
          )
        )
      );
    };

    loadModels();
  }, []);

  const predictProperties = useCallback(
    async (relation: number[][]) => {
      if (!propertyModels) return Array(9).fill(0);

      setIsCalculating(true);

      const input = tensor(relation).reshape([1, 5, 5, 1]);
      const results = propertyModels.map(model => model.predict(input));

      const predictions = [];

      for (const result of results) {
        const prediction = await (result as any).array();
        predictions.push(prediction[0][0]);
      }

      setTimeout(() => {
        setIsCalculating(false);
      }, 500);

      return predictions as number[];
    },
    [propertyModels]
  );

  const predictOperation = async (relation: number[][], operation: number) => {
    if (!operationModels) return getZerosArray();

    setIsCalculating(true);

    const input = tensor(relation).reshape([1, 5, 5, 1]);
    const prediction = await (
      operationModels[operation].predict(input) as any
    ).array();

    const matrix = getZerosArray();

    for (let i = 0; i < prediction[0].length; i++)
      matrix[Math.floor(i / 5)][i % 5] = Math.round(prediction[0][i]);

    return matrix as number[][];
  };

  const predictInverse = (relation: number[][]) =>
    predictOperation(relation, 0);

  const predictSquare = (relation: number[][]) => predictOperation(relation, 1);

  return {
    isLoading: !propertyModels || !operationModels,
    isCalculating,
    predictProperties,
    predictInverse,
    predictSquare,
  };
};

export default useModels;
