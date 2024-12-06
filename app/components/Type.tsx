import { IoIosCheckmark, IoIosClose } from "react-icons/io";

type Props = {
  name: string;
  dependencyNames: string[];
  dependencyPredictions: number[];
};

const Type: React.FC<Props> = ({
  name,
  dependencyNames,
  dependencyPredictions,
}) => (
  <div className="bg-gray-100 rounded p-3">
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
