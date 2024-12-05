import { IoIosCheckmark, IoIosClose } from "react-icons/io";

type Props = {
  name: string;
  prediction: number;
};

const Property: React.FC<Props> = ({ name, prediction }) => (
  <div className="flex items-center gap-2">
    {prediction >= 0.5 ? (
      <IoIosCheckmark className="text-green-500 text-4xl" />
    ) : (
      <IoIosClose className="text-red-500 text-4xl" />
    )}
    <span className="font-medium text-xl">{name}</span>
    <span className="text-gray-600 font-medium text-xl">
      {((prediction >= 0.5 ? prediction : 1 - prediction) * 100).toFixed(2)}%
    </span>
  </div>
);

export default Property;
