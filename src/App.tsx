import { ThemeProvider } from "@/components/theme-provider";
import './App.css';
import AppDashboard from "./components/app-dashboard";

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppDashboard />
    </ThemeProvider>
  )
}

export default App
