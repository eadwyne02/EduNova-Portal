// import { useState } from "react";
import {Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
function App(){
  
 return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/dashboard" element = {<Dashboard />}></Route>
    </Routes>
  )
}
export default App