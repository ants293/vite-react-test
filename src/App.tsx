import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { Board } from "./components/board/Board";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Board />
      </div>
    </QueryClientProvider>
  );
}

export default App;
