import "./App.css";
import SortingVisualizer from "./components/visualizers/SortingVisualizer/SortingVisualizer.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <div className="App">
      <Navbar />
      <SortingVisualizer />
    </div>
  );
}

export default App;
