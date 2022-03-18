import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Reportes from './Pages/Reportes/Reportes'
import Login from './Pages/Login/Login'



function App() {
  return (
   
        <div className="App">
          <Navbar/>
        
          <Routes>
              
              <Route exact path="/Login" element={<Login/>}/>
              <Route exact path="/Home" element={<Home/>}/>
                      
                        
          </Routes>
              
        

        </div>
 
        
   
  )
}
  
export default App;