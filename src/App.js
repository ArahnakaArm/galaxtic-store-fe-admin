import "./App.css";
import Topbar from "./components/main/topbar";
import Sidebar from "./components/main/sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar></Sidebar>
      <h1 className="text-2xl font-bold underline">Hello world!</h1>
    </div>
  );
}

export default App;
