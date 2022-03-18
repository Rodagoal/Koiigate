import React from 'react';
import axios from 'axios';
import './login.css';
import  Logo from '../../assets/Logo.jpg';



class Login extends React.Component{
   
  constructor(props){
    super(props);
    this.state={
      user:'',
      pwd:''

    }
  }
  

    handleChange=(e)=>{
        console.log(e.target.value)
     
        this.setState({[e.target.name]:e.target.value})
        

    }

    loginUser () {
        let usuario = this.state.user;
        let pass = this.state.password;
  
        axios.post("http://localhost:5000/login", {usuario,  pass})
        .then(res => {
  
          if(res.data.result){
            this.props.setToken(res.data.token);
            this.props.history.push('/')
          }
          else{
            this.setState({
              error: true,
            })
          }
          return;
        })
    }

    handleSubmit=(e)=>{
            e.preventDefault()
            this.loginUser();
    }


    render(){
        return(
            
                
                <div className='div-login'>
                    <div >
                       <img
                       src={Logo}
                       width="95%"
                       height="95%"
                       className="align-center"
                       alt="React Bootstrap logo"
                       
                       />
                    </div>

                    <form onSubmit ={this.handleSubmit}>
                        <input className='input' type='user' name='user' placeholder='Usuario...' required onChange={this.handleChange}></input>
                        <input className='input' type='password' name='pwd' placeholder='Contraseña...' required onChange={this.handleChange}></input>

                        <button className='button' onSubmit ={this.handleSubmit}>Ingresar</button>

                    </form>

                </div>


           

        )
    }
}

export default Login;