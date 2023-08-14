// import './App.css';
import {Routes,Route,BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import EditData from "./components/EditData";

function App() {
  return(
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/editdata/:id" element={<EditData/>}/>
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
