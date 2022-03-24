import React, { Component } from 'react';
import {Navbar,Nav,Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'




class NavbarComp extends Component{
   
    render(){
        return(
            <>
         
            <Navbar bg="primary" variant="dark">
                <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link as={Link} to="/Home">Home</Nav.Link>
                <Nav.Link as={Link} to="/Reportes">Reportes</Nav.Link>
                <Nav.Link as={Link} to="/Progreso">Progeso</Nav.Link>
                <Nav.Link as={Link} to="/Perfil">Perfil</Nav.Link>
                </Nav>
                </Container>
            </Navbar>

            
            </>
        )
    }
}
export default NavbarComp;