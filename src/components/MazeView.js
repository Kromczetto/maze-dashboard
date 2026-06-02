export default function MazeView({ run }) {
  const { width, height, maze, walls } = run;

  const cell = 55;

  const getIndex = (x, y) => y * width + x;

  return (
    <div
      style={{
        display: "inline-block",
        background: "#111827",
        padding: 20,
        borderRadius: 20,
        boxShadow: "0 10px 30px rgba(0,0,0,.4)"
      }}
    >
      <div
        style={{
          position: "relative",
          width: width * cell,
          height: height * cell,
          background: "#020617",
          borderRadius: 12,
          border: "2px solid #334155"
        }}
      >
        {[...Array(width)].map((_, x) =>
          [...Array(height)].map((_, y) => {
            const i = getIndex(x, y);

            const value = maze[i];
            const wall = walls[i];

            return (
              <div
                key={`${x}-${y}`}
                style={{
                  position: "absolute",
                  left: x * cell,
                  top: (height - 1 - y) * cell,
                  width: cell,
                  height: cell
                }}
              >
                <div style={styles.value}>
                  {value !== 255 ? value : "?"}
                </div>

                {hasWall(wall, 0) && (
                  <div style={styles.top} />
                )}

                {hasWall(wall, 1) && (
                  <div style={styles.right} />
                )}

                {hasWall(wall, 2) && (
                  <div style={styles.bottom} />
                )}

                {hasWall(wall, 3) && (
                  <div style={styles.left} />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function hasWall(w, dir) {
  return (w & (1 << dir)) !== 0;
}

const styles = {
  value: {
    color: "#38bdf8",
    fontSize: 18,
    fontWeight: 700,
    textAlign: "center",
    lineHeight: "55px"
  },

  top: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: "white"
  },

  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    background: "white"
  },

  left: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    background: "white"
  },

  right: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
    background: "white"
  }
};