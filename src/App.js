import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/sigin/Signup.jsx";
import Layout from "./components/Layout/layout.jsx";
import EditTask from "./components/EditTask/EditTask.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route
          element={
            <Layout isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          }
        >
          <Route index element={<TaskList />} />
          <Route path="edit/:ptsId" element={<EditTask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
