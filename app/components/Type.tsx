import { IoIosCheckmark, IoIosClose } from "react-icons/io";

type Props = {
  name: string;
  dependencies: number[];
};

const Type: React.FC<Props> = ({ name, dependencies }) => (
  <div className="flex items-center gap-2">
    {dependencies.every(prediction => prediction >= 0.5) ? (
      <IoIosCheckmark className="text-green-500 text-4xl" />
    ) : (
      <IoIosClose className="text-red-500 text-4xl" />
    )}
    <span className="font-medium text-xl">{name}</span>
  </div>
);

export default Type;
