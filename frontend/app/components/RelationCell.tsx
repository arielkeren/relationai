// Props for the RelationCell component
type Props = {
  isOn: boolean;
  i: number;
  j: number;
  togglePair: (i: number, j: number) => void;
};

// RelationCell component
const RelationCell: React.FC<Props> = ({ isOn, i, j, togglePair }) => (
  <button
    onClick={() => togglePair(i, j)}
    className={`h-[60.8px] w-[60.8px] rounded transition-colors duration-300 ${
      isOn ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-300 hover:bg-gray-200"
    }`}
  ></button>
);

export default RelationCell;
