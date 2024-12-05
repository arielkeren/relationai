import { FaDiceThree } from "react-icons/fa";

type Props = {
  toggleAllOn: () => void;
  toggleAllOff: () => void;
  toggleRandom: () => void;
};

const RelationButtons: React.FC<Props> = ({
  toggleAllOn,
  toggleAllOff,
  toggleRandom,
}) => {
  return (
    <div className="flex gap-[4px]">
      <button
        onClick={toggleAllOn}
        className="bg-gray-800 text-white h-16 w-[108px] rounded transition-colors hover:bg-gray-700"
      >
        All On
      </button>
      <button
        onClick={toggleAllOff}
        className="bg-gray-800 text-white h-16 w-[108px] rounded transition-colors hover:bg-gray-700"
      >
        All Off
      </button>
      <button
        onClick={toggleRandom}
        className="flex justify-center items-center gap-1 bg-gray-800 text-white h-16 w-[108px] rounded transition-colors hover:bg-gray-700"
      >
        <FaDiceThree /> Random
      </button>
    </div>
  );
};

export default RelationButtons;
