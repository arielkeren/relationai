import { IoIosCheckmark, IoIosClose } from "react-icons/io";
import { PropertyName, TypeName } from "../types";

// Props for the Type component
type Props = {
  name: TypeName;
  dependencyNames: string[];
  dependencyPredictions: number[];
  modifyRelation: (property: PropertyName | TypeName) => void;
};

// Type component
const Type: React.FC<Props> = ({
  name,
  dependencyNames,
  dependencyPredictions,
  modifyRelation,
}) => (
  <div
    onClick={() => modifyRelation(name)}
    className="w-80 bg-gray-50 rounded p-3 drop-shadow-md cursor-pointer transition-colors hover:bg-gray-100"
  >
    <div className="flex items-center gap-2">
      {dependencyPredictions.every(prediction => prediction >= 0.5) ? (
        <IoIosCheckmark className="bg-green-500 text-white text-3xl rounded" />
      ) : (
        <IoIosClose className="bg-red-500 text-white text-3xl rounded" />
      )}
      <span className="font-bold text-xl uppercase">{name}</span>
    </div>
    <span className="text-gray-600">
      {dependencyNames.join(", ").toLowerCase()}
    </span>
  </div>
);

export default Type;
