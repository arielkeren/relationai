import { FaDiceThree } from "react-icons/fa";
import { PiEmptyBold } from "react-icons/pi";
import Button from "./Button";

// Props for the RelationButtons component
type Props = {
  toggleAllOn: () => void;
  toggleAllOff: () => void;
  setIdentityRelation: () => void;
  invertRelation: () => void;
  composeRelation: () => void;
  randomizeRelation: () => void;
};

// RelationButtons component
const RelationButtons: React.FC<Props> = ({
  toggleAllOn,
  toggleAllOff,
  setIdentityRelation,
  invertRelation,
  composeRelation,
  randomizeRelation,
}) => (
  <div className="flex flex-col gap-1">
    <div className="flex gap-1">
      <Button
        onClick={toggleAllOff}
        isWide={false}
        isGradient={false}
        isMono={false}
      >
        <PiEmptyBold />
      </Button>
      <Button
        onClick={invertRelation}
        isWide={false}
        isGradient={true}
        isMono={false}
      >
        R⁻¹
      </Button>
      <Button
        onClick={setIdentityRelation}
        isWide={false}
        isGradient={false}
        isMono={true}
      >
        I
      </Button>
      <Button
        onClick={composeRelation}
        isWide={false}
        isGradient={true}
        isMono={false}
      >
        R²
      </Button>
      <Button
        onClick={toggleAllOn}
        isWide={false}
        isGradient={false}
        isMono={false}
      >
        A²
      </Button>
    </div>
    <Button
      onClick={randomizeRelation}
      isWide={true}
      isGradient={false}
      isMono={false}
    >
      <FaDiceThree />
    </Button>
  </div>
);

export default RelationButtons;
