import React from 'react';
import {Router, Route} from 'react-router-dom'
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Login from "./Pages/Login/Login"



function App() {
  return (
   <div className="App">
     <Navbar />
     <Login>

     </Login>
     <h1>React here!</h1>
   </div>
  );
}
  
export default App;