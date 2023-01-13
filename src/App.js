import Homepage from "./components/home/Homepage";
import './App.css'
import { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes, redirect } from "react-router-dom";
import jwt_decode from "jwt-decode"
import UserSettings from "./components/user-settings/UserSettings";
import axios from "axios";
import { REST_API_SERVER_URL } from "./utils/constants";


function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
      const token = localStorage.getItem("jwt");
      if (token) {
        setUser(jwt_decode(token))
      } else {
        setUser(null)
      }
  }, [])

  const handleLogout = () => {
    // Local storage is checked for a token.
    if (localStorage.getItem("jwt")) {
        // If it exists, delete it.
        localStorage.removeItem("jwt");
        setUser(null)
        return redirect("/")
    }   
  };


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage user={user} setUser={setUser}/>}/>
        {/* <Route path="/couple/assign" element={<Couple user={user} setUser={setUser} />} /> */}
        <Route path="/settings" element={<UserSettings user={user} setUser={setUser} handleLogout={handleLogout} />} />
      </Routes>
    </Router>
  );
}

export default App;
