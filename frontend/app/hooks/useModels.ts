import { useCallback, useEffect, useState } from "react";
import { LayersModel, loadLayersModel, tensor } from "@tensorflow/tfjs";
import { PROPERTY_NAMES, OPERATION_NAMES } from "../types";
import { getZerosArray } from "../operations";

const useModels = () => {
  // State to manage the loaded property models
  const [propertyModels, setPropertyModels] = useState<LayersModel[] | null>(
    null
  );
  // State to manage the loaded operation models
  const [operationModels, setOperationModels] = useState<LayersModel[] | null>(
    null
  );
  // State to manage when the models are running calculations
  const [isCalculating, setIsCalculating] = useState(false);

  // Load the models when the component mounts
  useEffect(() => {
    // Loads the property and operation models from their folders
    const loadModels = async () => {
      // Load the property models
      setPropertyModels(
        await Promise.all(
          PROPERTY_NAMES.map(property =>
            loadLayersModel(`/models/${property.toLowerCase()}/model.json`)
          )
        )
      );

      // Load the operation models
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

  // Predicts the properties of a relation using the property models
  const predictProperties = useCallback(
    async (relation: number[][]) => {
      // Return if the models are not loaded
      if (!propertyModels) return Array(9).fill(0);

      // Notify the user that the models are calculating
      setIsCalculating(true);

      // Flatten the relation and expand it to be 1x25
      const input = tensor(relation).reshape([1, 25]);
      // Run the property models on the reshaped relation
      const results = propertyModels.map(model => model.predict(input));

      // Initialize the predictions array
      const predictions = [];

      // Iterate through the results and convert them to actual values
      for (const result of results) {
        // Convert the current result to an array
        const prediction = await (result as any).array();
        // Push the predicted value to the predictions array
        predictions.push(prediction[0][0]);
      }

      // Notify the user that the models are done calculating after a delay
      setTimeout(() => {
        setIsCalculating(false);
      }, 500);

      // Return the predictions as an array of numbers
      return predictions as number[];
    },
    [propertyModels]
  );

  // Predicts the inversion or composition of a relation using the operation models
  const predictOperation = async (relation: number[][], operation: number) => {
    // Return if the models are not loaded
    if (!operationModels) return getZerosArray();

    // Notify the user that the models are calculating
    setIsCalculating(true);

    // Flatten the relation and expand it to be 1x25
    const input = tensor(relation).reshape([1, 25]);
    // Run the operation model on the reshaped relation
    const prediction = await (
      operationModels[operation].predict(input) as any
    ).array();

    // Initialize an empty matrix to fill with the predicted values
    const matrix = getZerosArray();

    // Iterate through the prediction and fill the matrix with the predicted values
    for (let i = 0; i < prediction[0].length; i++)
      matrix[Math.floor(i / 5)][i % 5] = Math.round(prediction[0][i]);

    // Return the matrix as a 2D array of numbers
    return matrix as number[][];
  };

  // Predicts the inversion of a relation
  const predictInversion = (relation: number[][]) =>
    predictOperation(relation, 0);

  // Predicts the composition of a relation with itself
  const predictComposition = (relation: number[][]) =>
    predictOperation(relation, 1);

  // Return the loading state, calculating state, and prediction functions
  return {
    isLoading: !propertyModels || !operationModels,
    isCalculating,
    predictProperties,
    predictInversion,
    predictComposition,
  };
};

export default useModels;
