import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasicForm from "./components/BasicForm";
import Home from "./components/Home";
import YupControlled from "./components/YupControlled";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basic" element={<BasicForm />} />
        <Route path="/yup-validation" element={<YupControlled />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
