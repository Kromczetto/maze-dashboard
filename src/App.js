import React, { useEffect, useState } from "react";
import RunList from "./components/RunList";
import MazeView from "./components/MazeView";

export default function App() {
  const [runs, setRuns] = useState([]);
  const [selected, setSelected] = useState(null);
  const [sortType, setSortType] = useState("time");

  useEffect(() => {
    fetch("https://maze-telemetry.up.railway.app/runs")
      .then((res) => res.json())
      .then((data) => setRuns(data))
      .catch(console.error);
  }, []);

  const sortedRuns = [...runs].sort((a, b) => {
    if (sortType === "time") return a.time - b.time;

    if (sortType === "size")
      return a.width * a.height - b.width * b.height;

    if (sortType === "created")
      return new Date(b.createdAt) - new Date(a.createdAt);

    return 0;
  });

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h1 style={styles.title}>Maze Runs</h1>

        <div style={styles.buttons}>
          <button
            style={buttonStyle}
            onClick={() => setSortType("time")}
          >
            Time
          </button>

          <button
            style={buttonStyle}
            onClick={() => setSortType("size")}
          >
            Size
          </button>

          <button
            style={buttonStyle}
            onClick={() => setSortType("created")}
          >
            Newest
          </button>
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
            <div style={styles.stats}>
              <div style={styles.statCard}>
                {selected.algorithm}
              </div>

              <div style={styles.statCard}>
               {selected.time} ms
              </div>

              <div style={styles.statCard}>
                {selected.cells} cells
              </div>

              <div style={styles.statCard}>
                {selected.turns} turns
              </div>

              <div style={styles.statCard}>
                {selected.width} × {selected.height}
              </div>
            </div>

            <MazeView run={selected} />
          </>
        ) : (
          <div style={styles.empty}>
            Select run from the left panel
          </div>
        )}
      </div>
    </div>
  );
}

const buttonStyle = {
  background: "#1e293b",
  color: "white",
  border: "1px solid #334155",
  borderRadius: 10,
  padding: "10px 16px",
  cursor: "pointer",
  fontWeight: 600
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "#0f172a",
    color: "white",
    overflow: "hidden"
  },

  sidebar: {
    width: 360,
    background: "#111827",
    borderRight: "1px solid #1f2937",
    padding: 24,
    overflowY: "auto"
  },

  title: {
    marginTop: 0,
    marginBottom: 20
  },

  buttons: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
    flexWrap: "wrap"
  },

  main: {
    flex: 1,
    padding: 30,
    overflow: "auto"
  },

  empty: {
    fontSize: 24,
    opacity: 0.7
  },

  stats: {
    display: "flex",
    gap: 15,
    marginBottom: 25,
    flexWrap: "wrap"
  },

  statCard: {
    background: "#111827",
    border: "1px solid #334155",
    borderRadius: 14,
    padding: "14px 18px",
    fontWeight: 600,
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
  }
};