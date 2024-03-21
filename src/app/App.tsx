import { FactFetcher } from "../features/factFetcher/component/FactFetcher";
import { NameAgeFetch } from "../features/nameAgeFetcher/components/NameAgeFetcher";

function App() {
  return (
    <div>
      <FactFetcher></FactFetcher>
      <NameAgeFetch></NameAgeFetch>
    </div>
  );
}

export default App;
