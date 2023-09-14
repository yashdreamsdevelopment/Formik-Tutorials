import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasicForm from "./components/BasicForm";
import Home from "./components/Home";
import YupControlled from "./components/YupControlled";
import AdvancedForm from "./components/AdvancedForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basic" element={<BasicForm />} />
        <Route path="/yup-validation" element={<YupControlled />} />
        <Route path="/advanced" element={<AdvancedForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
