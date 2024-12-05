"use client";

import Properties from "./components/Properties";

const Home = () => {
  const sampleRelation = [
    [1, 0, 1, 0, 1],
    [0, 1, 1, 0, 0],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1],
    [1, 0, 0, 1, 1],
  ];

  return (
    <div>
      <Properties relation={sampleRelation} />
    </div>
  );
};

export default Home;
