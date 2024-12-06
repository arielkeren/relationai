type Props = {
  name: string;
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

const Property: React.FC<Props> = ({ name, prediction }) => {
  const backgroundColor = interpolateColor(prediction);

  return (
    <>
      <div className="flex justify-between items-end mb-1">
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
    </>
  );
};

export default Property;
