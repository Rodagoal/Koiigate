import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter as Router,Route,Routes,} from "react-router-dom";
import Login from './Pages/Login/Login';



const App=()=> {
  return (
   <div className="App">
    
      
      
      <Navbar />
        <Routes>
          <Route exact path='/' element={<Login/>}></Route>
         
        </Routes>
     
  

   </div>
  );
}
  
export default App;