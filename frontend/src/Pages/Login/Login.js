import React from 'react';
import axios from 'axios';
import


class Login extends React.Component{
state={
    email:'',
    pwd:''
}

    handleChange=(e)=>{
        const{name,value}=e.target
        this.setState({[name]:value})

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
                    <div className='div-login-logo'>
                        <Logo/>
                    </div>

                    <form onSubmit ={this.handleSubmit}>
                        <input type='user' name='user' placeholder='user...' required onChange={this.handleChange}></input>
                        <input type='password' name='pwd' placeholder='password...' required onChange={this.handleChange}></input>

                        <button onSubmit ={this.handleSubmit}>Log in</button>

                    </form>

                </div>


           

        )
    }
}

export default Login;