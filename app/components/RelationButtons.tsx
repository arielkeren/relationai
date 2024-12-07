import { FaDiceThree } from "react-icons/fa";
import { PiEmptyBold } from "react-icons/pi";

type Props = {
  toggleAllOn: () => void;
  toggleAllOff: () => void;
  setIdentityRelation: () => void;
  invertRelation: () => void;
  randomizeRelation: () => void;
};

const RelationButtons: React.FC<Props> = ({
  toggleAllOn,
  toggleAllOff,
  setIdentityRelation,
  invertRelation,
  randomizeRelation,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        <button
          onClick={toggleAllOff}
          className="flex justify-center items-center gap-1 text-3xl bg-gray-800 text-white h-16 w-[82px] rounded drop-shadow-md transition-colors hover:bg-gray-700"
        >
          <PiEmptyBold />
        </button>
        <button
          onClick={setIdentityRelation}
          className="flex justify-center items-center gap-1 font-mono text-4xl bg-gray-800 text-white h-16 w-[82px] rounded drop-shadow-md transition-colors hover:bg-gray-700"
        >
          I
        </button>
        <button
          onClick={invertRelation}
          className="flex justify-center items-center gap-1 text-3xl bg-gray-800 text-white h-16 w-[82px] rounded drop-shadow-md transition-colors hover:bg-gray-700"
        >
          R⁻¹
        </button>
        <button
          onClick={toggleAllOn}
          className="flex justify-center items-center gap-1 text-3xl bg-gray-800 text-white h-16 w-[82px] rounded drop-shadow-md transition-colors hover:bg-gray-700"
        >
          A²
        </button>
      </div>
      <button
        onClick={randomizeRelation}
        className="flex justify-center items-center gap-1 text-2xl bg-gray-800 text-white h-16 w-[340px] rounded drop-shadow-md transition-colors hover:bg-gray-700"
      >
        <FaDiceThree />
      </button>
    </div>
  );
};

export default RelationButtons;
