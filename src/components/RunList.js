import React, { useState } from "react";
import MazeView from "./MazeView";

export default function RunList({ runs }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div style={{ width: 300 }}>
        {runs.map((run, i) => (
          <div
            key={i}
            onClick={() => setSelected(run)}
            style={{
              padding: 10,
              marginBottom: 10,
              background: "#222",
              color: "white",
              cursor: "pointer"
            }}
          >
            <div>Time: {run.time} ms</div>
            <div>Cells: {run.cells}</div>
            <div>Turns: {run.turns}</div>
            <div>Algo: {run.algorithm}</div>
          </div>
        ))}
      </div>

      <div>
        {selected && <MazeView run={selected} />}
      </div>
    </div>
  );
}