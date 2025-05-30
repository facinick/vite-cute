import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RefreshCw, Gamepad2, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Ruleset = {
  name: string;
  survival: number[];
  birth: number[];
};

type RulesetKey = 'classic' | 'highLife' | 'dayAndNight' | 'seeds';

const RULESETS: Record<RulesetKey, Ruleset> = {
  classic: {
    name: "Classic (B3/S23)",
    survival: [2, 3],
    birth: [3]
  },
  highLife: {
    name: "High Life (B36/S23)",
    survival: [2, 3],
    birth: [3, 6]
  },
  dayAndNight: {
    name: "Day & Night (B3678/S34678)",
    survival: [3, 4, 6, 7, 8],
    birth: [3, 6, 7, 8]
  },
  seeds: {
    name: "Seeds (B2/)",
    survival: [],
    birth: [2]
  }
};

interface GameOfLifeProps {
  rows: number;
  columns: number;
  cellSize: number;
}

export function GameOfLife({ rows = 30, columns = 50, cellSize = 20 }: GameOfLifeProps) {
  const [grid, setGrid] = useState<boolean[][]>(() => 
    Array(rows).fill(0).map(() => Array(columns).fill(false))
  );
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [ruleset, setRuleset] = useState<RulesetKey>('classic');

  // Initialize grid
  const createEmptyGrid = useCallback(() => {
    return Array(rows).fill(0).map(() => Array(columns).fill(false));
  }, [rows, columns]);

  // Toggle cell state
  const toggleCell = (row: number, col: number) => {
    const newGrid = grid.map(row => [...row]);
    newGrid[row][col] = !newGrid[row][col];
    setGrid(newGrid);
  };

  // Reset grid
  const resetGrid = () => {
    setGrid(createEmptyGrid());
    setIsRunning(false);
  };

  // Randomize grid
  const randomizeGrid = () => {
    const newGrid = createEmptyGrid().map(row => 
      row.map(() => Math.random() > 0.7)
    );
    setGrid(newGrid);
  };

  // Game of Life logic
  const nextGeneration = useCallback(() => {
    setGrid(currentGrid => {
      const newGrid = createEmptyGrid();
      
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          let neighbors = 0;
          
          // Count live neighbors
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
              if (x === 0 && y === 0) continue;
              
              const newX = i + x;
              const newY = j + y;
              
              if (
                newX >= 0 && 
                newX < rows && 
                newY >= 0 && 
                newY < columns && 
                currentGrid[newX][newY]
              ) {
                neighbors++;
              }
            }
          }

                  // Apply selected ruleset
          const currentRuleset = RULESETS[ruleset];
          if (currentGrid[i][j]) {
            newGrid[i][j] = currentRuleset.survival.includes(neighbors);
          } else {
            newGrid[i][j] = currentRuleset.birth.includes(neighbors);
          }
        }
      }
      
      return newGrid;
    });
  }, [rows, columns, createEmptyGrid]);

  // Game loop
  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      nextGeneration();
    }, 1000 - speed * 9); // Speed ranges from 100ms to 1000ms

    return () => clearInterval(intervalId);
  }, [isRunning, nextGeneration, speed]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {RULESETS[ruleset].name}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.entries(RULESETS).map(([key, { name }]) => (
                <DropdownMenuItem 
                  key={key}
                  onClick={() => setRuleset(key as RulesetKey)}
                  className={ruleset === key ? 'bg-accent' : ''}
                >
                  {name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="h-8 w-px bg-border" />
        <div className="flex items-center gap-2">
          <Button 
            onClick={() => setIsRunning(!isRunning)}
            variant={isRunning ? "destructive" : "default"}
          >
            {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button variant="outline" onClick={resetGrid}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button variant="outline" onClick={randomizeGrid}>
            <Gamepad2 className="mr-2 h-4 w-4" />
            Randomize
          </Button>
        </div>
        <div className="h-8 w-px bg-border" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Speed:</span>
          <Slider
            value={[speed]}
            onValueChange={([value]) => setSpeed(value)}
            min={0}
            max={100}
            step={1}
            className="w-[150px]"
          />
        </div>
      </div>

      <div 
        className="grid gap-px bg-border p-1 rounded-md border overflow-auto max-w-full"
        style={{
          gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
          width: 'fit-content',
          maxHeight: 'calc(100vh - 250px)'
        }}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <motion.div
              key={`${i}-${j}`}
              onClick={() => toggleCell(i, j)}
              className={`cursor-pointer rounded-sm ${
                cell ? 'bg-primary' : 'bg-background'
              }`}
              style={{
                width: cellSize - 2,
                height: cellSize - 2,
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 500 }}
            />
          ))
        )}
      </div>

      <div className="text-sm text-muted-foreground mt-2">
        <p>Click on cells to toggle them. Click Start to begin the simulation.</p>
        <p className="mt-1 text-xs opacity-70">
          Current rules: A cell is born with {RULESETS[ruleset].birth.join(' or ')} neighbors, 
          survives with {RULESETS[ruleset].survival.length > 0 ? RULESETS[ruleset].survival.join(' or ') : 'no'} neighbors.
        </p>
      </div>
    </div>
  );
}
