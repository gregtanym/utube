import Feed from "./components/Feed";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="homepage-container">
      <Header/>
      <Sidebar/>
      <Feed/>
    </div>
  );
}

export default App;
