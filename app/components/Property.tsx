import { MathJax } from "better-react-mathjax";
import { useState } from "react";

type Props = {
  name: string;
  definition: string;
  prediction: number;
};

const interpolateColor = (value: number) => {
  let red, green;

  if (value <= 0.5) {
    red = 255;
    green = Math.round(value * 2 * 255);
  } else {
    red = Math.round((1 - (value - 0.5) * 2) * 255);
    green = 255;
  }

  return `rgb(${red}, ${green}, 0)`;
};

const Property: React.FC<Props> = ({ name, definition, prediction }) => {
  const [isDefinition, setIsDefinition] = useState(false);

  const backgroundColor = interpolateColor(prediction);

  const toggleDefinition = () => {
    setIsDefinition(!isDefinition);
  };

  return (
    <div
      onClick={toggleDefinition}
      className="flex flex-col gap-1 cursor-pointer p-2 rounded select-none transition-colors hover:bg-gray-100 hover:drop-shadow-md"
    >
      <div className="flex justify-between items-end mb-1 h-6">
        {isDefinition ? (
          <MathJax>{definition}</MathJax>
        ) : (
          <>
            <span className="text-xl font-bold uppercase">{name}</span>
            <span className="text-md font-bold text-gray-600">
              {Math.round(prediction * 100)}%
            </span>
          </>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="h-3 rounded-full transition-all duration-300"
          style={{
            width: `${Math.max(10, prediction * 100)}%`,
            backgroundColor,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Property;
