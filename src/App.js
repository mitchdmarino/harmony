import Homepage from "./components/home/Homepage";
import './App.css'
import { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes, redirect, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"
import UserSettings from "./components/user-settings/UserSettings";
import axios from "axios";
import { REST_API_SERVER_URL } from "./utils/constants";
import { showUser } from "./utils/rest_api";


function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
      const getUserInfo = async () => {
        const token = localStorage.getItem("jwt");
        try {
          if (token) {
            const response = await showUser(token)
            setUser(response)
          } else {
            setUser(null)
          }
        } catch (error) {
          console.warn(error)
        }
        
      }
      getUserInfo()
      
  }, [])

  const handleLogout = () => {
    // Local storage is checked for a token.
    if (localStorage.getItem("jwt")) {
        // If it exists, delete it.
        localStorage.removeItem("jwt");
        setUser(null)
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
