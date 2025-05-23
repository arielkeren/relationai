import { PropertyName, TypeName } from "../types";

// Props for the Property component
type Props = {
  name: PropertyName;
  prediction: number;
  modifyRelation: (property: PropertyName | TypeName) => void;
};

// Interpolates between red and green based on the prediction value
const interpolateColor = (value: number) => {
  let red, green;

  // Closer to 0 is red, closer to 1 is green
  if (value <= 0.5) {
    red = 255;
    green = Math.round(value * 2 * 255);
  } else {
    red = Math.round((1 - (value - 0.5) * 2) * 255);
    green = 255;
  }

  // Return the interpolated color in RGB format
  return `rgb(${red}, ${green}, 0)`;
};

// Property component
const Property: React.FC<Props> = ({ name, prediction, modifyRelation }) => {
  // Interpolate the color based on the prediction value
  const backgroundColor = interpolateColor(prediction);

  return (
    <div
      onClick={() => modifyRelation(name)}
      className="flex flex-col gap-1 w-80 cursor-pointer p-2 rounded transition-colors hover:bg-gray-100 hover:drop-shadow-md"
    >
      <div className="flex justify-between items-end mb-1 h-6">
        <span className="text-xl font-bold uppercase">{name}</span>
        <span className="text-md font-bold text-gray-600">
          {Math.round(prediction * 100)}%
        </span>
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
