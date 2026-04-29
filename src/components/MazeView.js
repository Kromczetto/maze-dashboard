export default function MazeView({ run }) {
    const { width, height, maze, walls } = run;
  
    const cell = 40;
  
    const getIndex = (x, y) => y * width + x;
  
    return (
      <div
        style={{
          position: "relative",
          width: width * cell,
          height: height * cell,
          background: "#013220",
          border: "2px solid white"
        }}
      >
        {[...Array(width)].map((_, x) =>
          [...Array(height)].map((_, y) => {
            const i = getIndex(x, y);
            const value = maze[i];
            const w = walls[i];
  
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
                {/* VALUE */}
                <div style={styles.value}>
                  {value !== 255 ? value : "?"}
                </div>
  
                {/* WALLS */}
                {hasWall(w, 0) && <div style={styles.top} />}
                {hasWall(w, 1) && <div style={styles.right} />}
                {hasWall(w, 2) && <div style={styles.bottom} />}
                {hasWall(w, 3) && <div style={styles.left} />}
              </div>
            );
          })
        )}
      </div>
    );
  }
  
  function hasWall(w, dir) {
    return (w & (1 << dir)) !== 0;
  }
  
  const styles = {
    value: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      lineHeight: "40px"
    },
    top: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 3,
      background: "white"
    },
    bottom: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 3,
      background: "white"
    },
    left: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 3,
      background: "white"
    },
    right: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      width: 3,
      background: "white"
    }
  };