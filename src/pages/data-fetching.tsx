import { Button } from "@/components/ui/button"
import { useStore } from '@/hooks/use-store';

export function DataFetching() {
  const { bears, addBear, fishes, addFish } = useStore();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Data Fetching</h1>
      <p className="text-muted-foreground mb-4">
        Examples of data fetching patterns and best practices.
      </p>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">Example: Bear Counter</h2>
          <div className="flex items-center gap-4">
            <span>Number of bears: {bears}</span>
            <Button size="sm" onClick={addBear}>
              Add a bear
            </Button>
          </div>
        </div>
        <div className="p-4 border rounded-lg">
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

export default DataFetching
