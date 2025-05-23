import RelationCell from "./RelationCell";

// Props for the Relation component
type Props = {
  relation: number[][];
  togglePair: (i: number, j: number) => void;
};

// Relation component
const Relation: React.FC<Props> = ({ relation, togglePair }) => (
  <div className="flex flex-col gap-1">
    {relation.map((row, i) => (
      <div key={i} className="flex gap-1">
        {row.map((cell, j) => (
          <RelationCell
            isOn={!!cell}
            i={i}
            j={j}
            togglePair={togglePair}
            key={`${i}${j}`}
          />
        ))}
      </div>
    ))}
  </div>
);

export default Relation;
