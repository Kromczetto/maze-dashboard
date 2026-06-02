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
              padding: 16,
              marginBottom: 14,
              borderRadius: 14,
              cursor: "pointer",

              background: isSelected
                ? "#1e293b"
                : "#111827",

              border: isSelected
                ? "2px solid #22d3ee"
                : "1px solid #334155",

              transition: "0.2s",

              boxShadow:
                "0 4px 12px rgba(0,0,0,0.25)"
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 10,
                color: "#38bdf8"
              }}
            >
              {run.algorithm}
            </div>

            <div>⏱ {run.time} ms</div>
            <div>📦 {run.cells} cells</div>
            <div>🔄 {run.turns} turns</div>
            <div>
              📐 {run.width} × {run.height}
            </div>
          </div>
        );
      })}
    </div>
  );
}