import React from 'react';
import './App.css';
import NavbarComp from "./components/Navbar/NavbarComp";
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Reportes from './Pages/Reportes/Reportes'
import Login from './Pages/Login/Login'
import Perfil from './Pages/Perfil/Perfil'
import 'bootstrap/dist/css/bootstrap.min.css';







function App() {
  return (      
          
          <div className="App">
           
            <NavbarComp/>
            <div className="Contenido">
              <Routes>
        
                  <Route exact path="/Login" element={<Login/>}/>
                  <Route exact path="/Home" element={<Home/>}/>
                  <Route exact path="/Reportes" element={<Reportes/>}/>
                  <Route exact path="/Perfil" element={<Perfil/>}/>
                        
              </Routes>

        
            </div> 
           
           
          </div>  
         
         
              
       

        
 
        
   
  )
}
  
export default App;