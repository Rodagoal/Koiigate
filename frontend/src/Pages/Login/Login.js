import React from 'react';
import axios from 'axios';



class Login extends React.Component{
    state={
      user:'',
      pwd:''

    }
    
    componentDidMount(){
      this.caliz()
    }

    handleChange=(e)=>{
        const{name,value}=e.target
        this.setState({[name]:value})

    }

    caliz (){

      axios.post("http://localhost:5000/login")
      .then(res =>{
        if(res.data){
          console.log(res.data)
        }
        else{
        }
        return;
      })  
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
                  <h1>Hola</h1>
                </div>
        )
    }
}

export default Login;