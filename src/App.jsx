import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Preferiti from "./components/Preferiti";
import MyNav from "./components/MyNav";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/films/:id" element={<Detail />} />
          <Route path="/:idUtente/preferiti" element={<Preferiti />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
