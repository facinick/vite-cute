import { GameOfLife } from "@/components/game-of-life";

export default function GameOfLifePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Conway's Game of Life</h1>
      <GameOfLife rows={30} columns={50} cellSize={20} />
    </div>
  );
}
