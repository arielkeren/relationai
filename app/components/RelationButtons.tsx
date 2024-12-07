import { FaDiceThree } from "react-icons/fa";
import { PiEmptyBold } from "react-icons/pi";

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
        onClick={toggleAllOff}
        className="flex justify-center items-center gap-1 text-3xl bg-gray-800 text-white h-16 w-[100px] rounded drop-shadow-md transition-colors hover:bg-gray-700"
      >
        <PiEmptyBold />
      </button>
      <button
        onClick={toggleRandom}
        className="flex justify-center items-center gap-1 text-2xl bg-gray-800 text-white h-16 w-[132px] rounded drop-shadow-md transition-colors hover:bg-gray-700"
      >
        <FaDiceThree />
      </button>
      <button
        onClick={toggleAllOn}
        className="flex justify-center items-center gap-1 text-3xl bg-gray-800 text-white h-16 w-[100px] rounded drop-shadow-md transition-colors hover:bg-gray-700"
      >
        A²
      </button>
    </div>
  );
};

export default RelationButtons;
