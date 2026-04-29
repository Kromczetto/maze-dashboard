import React, { useEffect, useState } from "react";
import RunList from "./components/RunList";

function App() {
  const [runs, setRuns] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetch("https://maze-telemetry.up.railway.app/runs")
      .then(res => res.json())
      .then(data => setRuns(data));
  }, []);

  const sortedRuns = [...runs].sort((a, b) =>
    sortAsc ? a.time - b.time : b.time - a.time
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Maze Runs Dashboard</h1>

      <button onClick={() => setSortAsc(!sortAsc)}>
        Sort by time: {sortAsc ? "ASC" : "DESC"}
      </button>

      <RunList runs={sortedRuns} />
    </div>
  );
}

export default App;