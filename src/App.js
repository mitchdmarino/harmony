import Homepage from "./components/home/Homepage";
import './App.css'
import { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";


function App() {
  const [user, setUser] = useState({
    name: "Mitchell",
    partner: "Dija",
    couple: {
        photos: [],
        questions: [],
        goals: [],
        conflicts:[],
    }
})
  useEffect(() => {

  })

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage user={user}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
