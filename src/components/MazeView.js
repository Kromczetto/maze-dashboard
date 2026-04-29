import React from "react";

export default function MazeView({ run }) {
  const { width, height, maze, walls } = run;

  const cellSize = 40;

  const getIndex = (x, y) => y * width + x;

  return (
    <div
      style={{
        position: "relative",
        width: width * cellSize,
        height: height * cellSize,
        background: "#003300"
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
                left: x * cellSize,
                top: (height - 1 - y) * cellSize,
                width: cellSize,
                height: cellSize,
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold"
              }}
            >
              {value !== 255 ? value : "?"}

              {/* WALLS */}
              {hasWall(w, 0) && <Wall dir="top" />}
              {hasWall(w, 1) && <Wall dir="right" />}
              {hasWall(w, 2) && <Wall dir="bottom" />}
              {hasWall(w, 3) && <Wall dir="left" />}
            </div>
          );
        })
      )}
    </div>
  );
}

function hasWall(walls, dir) {
  return (walls & (1 << dir)) !== 0;
}

function Wall({ dir }) {
  const styles = {
    position: "absolute",
    background: "white"
  };

  if (dir === "top")
    return <div style={{ ...styles, top: 0, left: 0, right: 0, height: 2 }} />;
  if (dir === "bottom")
    return <div style={{ ...styles, bottom: 0, left: 0, right: 0, height: 2 }} />;
  if (dir === "left")
    return <div style={{ ...styles, left: 0, top: 0, bottom: 0, width: 2 }} />;
  if (dir === "right")
    return <div style={{ ...styles, right: 0, top: 0, bottom: 0, width: 2 }} />;

  return null;
}