import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import "./App.css"
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/" element={<Home />}/>
          <Route path="/Home" element={<Home />}/>
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
