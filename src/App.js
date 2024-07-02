import Quiz from "./component/Quiz";
import Result from "./component/Result";
import Start from "./component/Start";
import { DataProvider } from "./context/dataContext";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Start />
        <Quiz />
        <Result />
      </DataProvider>
    </div>
  );
}

export default App;
