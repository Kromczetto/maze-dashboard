export default function RunList({ runs, selected, onSelect }) {
    return (
      <div>
        {runs.map((run, i) => {
          const isSelected = selected === run;
  
          return (
            <div
              key={i}
              onClick={() => onSelect(run)}
              style={{
                padding: 12,
                marginBottom: 10,
                borderRadius: 10,
                cursor: "pointer",
                background: isSelected ? "#444" : "#222",
                border: isSelected ? "2px solid #00ffcc" : "none"
              }}
            >
              <div><b>{run.time} ms</b></div>
              <div>Cells: {run.cells}</div>
              <div>Turns: {run.turns}</div>
              <div>Algo: {run.algorithm}</div>
              <div>Size: {run.width}x{run.height}</div>
            </div>
          );
        })}
      </div>
    );
  }