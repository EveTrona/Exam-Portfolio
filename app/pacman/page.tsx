"use client";

import React, { useState, useEffect } from "react";

const CELL_SIZE = 20;
const MAZE_WIDTH = 20;
const MAZE_HEIGHT = 20;

interface MazeCell {
  isWall: boolean;
  hasDot: boolean;
}

const generateMaze = (): MazeCell[][] => {
  const maze: MazeCell[][] = Array.from({ length: MAZE_HEIGHT }, () =>
    Array.from({ length: MAZE_WIDTH }, () => ({
      isWall: false,
      hasDot: false,
    }))
  );

  for (let y = 0; y < MAZE_HEIGHT; y++) {
    for (let x = 0; x < MAZE_WIDTH; x++) {
      if (Math.abs(x - 1) <= 1 && Math.abs(y - 1) <= 1) {
        maze[y][x].isWall = false;
      } else {
        maze[y][x].isWall = Math.random() > 0.7;
      }
    }
  }

  for (let y = 0; y < MAZE_HEIGHT; y++) {
    for (let x = 0; x < MAZE_WIDTH; x++) {
      if (!maze[y][x].isWall) {
        maze[y][x].hasDot = Math.random() > 0.3;
      }
    }
  }

  return maze;
};

export default function PacmanGame() {
  const [pacmanPos, setPacmanPos] = useState({ x: 1, y: 1 });
  const [score, setScore] = useState(0);
  const [maze, setMaze] = useState<MazeCell[][] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState<"up" | "down" | "left" | "right">(
    "right"
  );

  useEffect(() => {
    setMaze(generateMaze());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!maze) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();

      let newX = pacmanPos.x;
      let newY = pacmanPos.y;

      switch (e.key) {
        case "ArrowUp":
          newY--;
          setDirection("up");
          break;
        case "ArrowDown":
          newY++;
          setDirection("down");
          break;
        case "ArrowLeft":
          newX--;
          setDirection("left");
          break;
        case "ArrowRight":
          newX++;
          setDirection("right");
          break;
        default:
          return;
      }

      if (
        newX >= 0 &&
        newX < MAZE_WIDTH &&
        newY >= 0 &&
        newY < MAZE_HEIGHT &&
        !maze[newY][newX].isWall
      ) {
        setPacmanPos({ x: newX, y: newY });

        if (maze[newY][newX].hasDot) {
          setScore(score + 10);
          const newMaze = maze.map((row) => [...row]);
          newMaze[newY][newX].hasDot = false;
          setMaze(newMaze);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [pacmanPos, maze, score]);

  if (isLoading || !maze) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-900 to-blue-700">
        <p className="text-white text-2xl font-mono">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  p-4">
      <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-md shadow-lg border border-white/20">
        <h1 className="text-dark dark:text-white text-center mb-4 text-xl font-bold font-['Press_Start_2P'] drop-shadow-md">
          Pacman Demo - Score: {score}
        </h1>
        <div
          className="relative bg-black rounded-lg overflow-hidden border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          style={{
            width: MAZE_WIDTH * CELL_SIZE,
            height: MAZE_HEIGHT * CELL_SIZE,
          }}
        >
          {maze.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`absolute transition-colors ${
                  cell.isWall ? "bg-blue-500 hover:bg-blue-400" : ""
                }`}
                style={{
                  left: x * CELL_SIZE,
                  top: y * CELL_SIZE,
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                }}
              >
                {cell.hasDot && (
                  <div className="w-[6px] h-[6px] bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                )}
              </div>
            ))
          )}
          {/* Pacman */}
          <div
            className="absolute bg-yellow-300 rounded-full transition-all duration-100 ease-linear animate-chomp"
            style={{
              left: pacmanPos.x * CELL_SIZE,
              top: pacmanPos.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              transform: `rotate(${
                direction === "up"
                  ? "90deg"
                  : direction === "down"
                  ? "-90deg"
                  : direction === "left"
                  ? "0deg"
                  : "180deg"
              })`,
              clipPath: "circle(50% at 50% 50%)",
            }}
          />
        </div>
      </div>

      {/* Keyframes via Tailwind plugin or global CSS */}
      <style jsx global>{`
        @keyframes chomp {
          0% {
            clip-path: circle(50% at 50% 50%);
          }
          50% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 50% 50%);
          }
          100% {
            clip-path: circle(50% at 50% 50%);
          }
        }
        .animate-chomp {
          animation: chomp 0.3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
