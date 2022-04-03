import React, { Component } from 'react';
import {Navbar,Nav,Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import  {Logo} from '../../assets/Logo.jpg';



class NavbarComp extends Component{
   

  
    render(){
        return(
            <>
       
            <Navbar className="color-nav" variant="dark" >
                <Container>
                    <Navbar.Brand as={Link} to="/Home">
                       Tedi
                    </Navbar.Brand>
                    
                    <Nav className="me-auto">
                    <Nav.Link as={Link} to="/Reportes">Reportes</Nav.Link>
                    <Nav.Link as={Link} to="/Progreso">Progreso</Nav.Link>
                    <Nav.Link as={Link} to="/Perfil">Perfil</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            
            </>
        )
    }
}
export default NavbarComp;