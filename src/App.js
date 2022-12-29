import Home from "./pages/Home";
import Single from './pages/Single'
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:id' element={<Single/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
