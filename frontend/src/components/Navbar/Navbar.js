import React, { Component } from 'react';
import { Button } from '../Button';
import {MenuItems} from "./MenuItems"
import './Navbar.css'
import logo from './Logo.jpg'



class Navbar extends Component{
    state={clicked:false}

    handleClick=()=>{
        this.setState({clicked: !this.state.clicked})
    }

    render(){
        return(
            <nav className="NavbarItems">
                <div className="menu.icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <h1 className="Navbar-logo">
                    <img 
                    src={logo}
                    width="25%"
                    height="25%"
                    className="align-center"
                    alt="React Bootstrap logo"
                    />
                </h1>
                <ul className={this.state.clicked ? 'nav-menu active': 'nav-menu'}>
                    {MenuItems.map((item, index)=>{
                        return( 
                        <li key={index}>
                            <a className={item.cName} href={item.url} >
                                {item.title}
                            </a>
                        </li>
                        )
                    })}
                </ul>
                <Button>Sign up</Button>
            </nav>
        )
    }
}
export default Navbar