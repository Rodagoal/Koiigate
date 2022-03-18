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
        
          <Routes>
              
              <Route exact path="/" element={<Login/>}/>
                      
                        
          </Routes>
              
        

        </div>
 
        
   
  )
}
  
export default App;