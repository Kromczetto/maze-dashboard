import React, { useEffect, useState } from "react";
import RunList from "./components/RunList";
import MazeView from "./components/MazeView";

export default function App() {
  const [runs, setRuns] = useState([]);
  const [selected, setSelected] = useState(null);

  const [sortType, setSortType] = useState("time");

  useEffect(() => {
    fetch("https://maze-telemetry.up.railway.app/runs")
      .then(res => res.json())
      .then(data => setRuns(data));
  }, []);

  const sortedRuns = [...runs].sort((a, b) => {
    if (sortType === "time") return a.time - b.time;
    if (sortType === "size")
      return (a.width * a.height) - (b.width * b.height);
    return 0;
  });

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2>Runs</h2>

        <div style={styles.buttons}>
          <button onClick={() => setSortType("time")}>Sort: Time</button>
          <button onClick={() => setSortType("size")}>Sort: Size</button>
        </div>

        <RunList
          runs={sortedRuns}
          selected={selected}
          onSelect={setSelected}
        />
      </div>

      <div style={styles.main}>
        {selected ? (
          <>
            <h2>Maze Preview</h2>
            <MazeView run={selected} />
          </>
        ) : (
          <p>Select a run</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "#111",
    color: "white"
  },
  sidebar: {
    width: 320,
    padding: 20,
    borderRight: "1px solid #333"
  },
  main: {
    flex: 1,
    padding: 20
  },
  buttons: {
    display: "flex",
    gap: 10,
    marginBottom: 10
  }
};