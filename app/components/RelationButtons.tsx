import { FaDiceThree } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";

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
        className="flex justify-center items-center gap-1 text-2xl bg-gray-800 text-white h-16 w-[100px] rounded drop-shadow-md uppercase transition-colors hover:bg-gray-700"
      >
        <IoMoon />
      </button>
      <button
        onClick={toggleRandom}
        className="flex justify-center items-center gap-1 text-2xl bg-gray-800 text-white h-16 w-[132px] rounded drop-shadow-md uppercase transition-colors hover:bg-gray-700"
      >
        <FaDiceThree />
      </button>
      <button
        onClick={toggleAllOn}
        className="flex justify-center items-center gap-1 text-3xl bg-gray-800 text-white h-16 w-[100px] rounded drop-shadow-md uppercase transition-colors hover:bg-gray-700"
      >
        <IoSunny />
      </button>
    </div>
  );
};

export default RelationButtons;
