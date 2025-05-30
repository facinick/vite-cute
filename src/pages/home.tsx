import { Button } from "@/components/ui/button"
import { useStore } from '@/hooks/use-store';

export function Home() {
  const { bears, addBear, fishes, addFish } = useStore();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to Cute Vite</h1>
      <p className="text-muted-foreground mb-6">
        Select a section from the sidebar to get started.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 border rounded-lg">
          <h2 className="font-semibold mb-2">Example: Bear Counter</h2>
          <div className="flex items-center gap-4">
            <span>Number of bears: {bears}</span>
            <Button size="sm" onClick={addBear}>
              Add a bear
            </Button>
          </div>
        </div>
        <div className="p-6 border rounded-lg">
          <h2 className="font-semibold mb-2">Example: Fish Counter</h2>
          <div className="flex items-center gap-4">
            <span>Number of fishes: {fishes}</span>
            <Button size="sm" onClick={addFish}>
              Add a fish
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
