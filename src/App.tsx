// import { useState } from "react";
import {Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Course from "./pages/course";
import ProgramChange from "./pages/programChange";
import Results from "./pages/result";
function App(){
  
 return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/dashboard" element = {<Dashboard />}></Route>
      <Route path="/dashboard/courses" element = {<Course/>}></Route>
      <Route path="/dashboard/program-change" element = {<ProgramChange />}></Route>
      <Route path = '/dashboard/results' element = {<Results />}></Route>
    </Routes>
  )
}
export default App