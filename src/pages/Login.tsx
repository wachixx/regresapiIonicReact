import React from 'react';
import { IonToolbar,  IonContent,  IonButton, IonInput, IonToast, IonItem,  IonFooter } from '@ionic/react';
// import { any } from 'prop-types';
import image from '../assets/logo.svg';
import { RouteComponentProps } from 'react-router';

import Header from '../components/Header';
import { CONFIG } from '../constants';

type Props = { props:any };
type State = {username: string, password: string, toastState: boolean, toastMessage: string, action: string, email: string};

class LoginPage extends React.Component <Props & RouteComponentProps<any>, State> {

  constructor(props: any) {
    super(props);
    this.state = {
     username: '',
     password: '',
     toastState: false,
     toastMessage: 'Message',
     action: "Login",
     email: ''
    };           
    this.event = new CustomEvent('loggedIn', {
      detail: false
    });
  }

  event: Event;

  updatePassword = (event: any) => {
    this.setState({ password: event.detail.value });
  };

  updateEmail = (event: any) => {
    this.setState({ email: event.detail.value });
  };

  toggleAction = () => {
    this.state.action === 'Login' ? this.setState({action: 'SignUp'}) : this.setState({action: 'Login'})
  }

  componentDidMount(){
    this.clearCredentials();
    this.props.history.listen((location, action) => {
      if(location.pathname == "/login"){
        this.clearCredentials();
      }
    })
  }

  clearCredentials(){
    this.event = new CustomEvent('loggedIn', {
      detail: false
    });
    window.dispatchEvent(this.event);   
    localStorage.removeItem("token");       
    localStorage.removeItem("username");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("email");
  }

  login= () => {
    let url , credentials;     
    if(this.state.action  == 'Login'){
      url = CONFIG.API_ENDPOINT + 'login';
      credentials = {
          "email": this.state.email,
          "password": this.state.password
      }
    } else {
      url = CONFIG.API_ENDPOINT + 'register';
      credentials = {
          "email": this.state.email,
          "password": this.state.password
      }
    }
    fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",              
            },
            body: JSON.stringify(credentials)

        })
        .then((res) => {
            return res.json();
        } )
        .then(
          (result) => { 
              console.error(result); 
              if(result.token){
                 localStorage.setItem("token",result.token);   
                 localStorage.setItem("isLogin", "true");
                 this.props.history.replace('/HomePage');
              }else{         
                //this.setState({toastMessage: result.toString(), toastState: true});
                alert(result.error);
              }
              
              this.event = new CustomEvent('loggedIn', {
                detail: true,
              });
              window.dispatchEvent(this.event);
          })
          .catch(
           function(error){
              console.error(error);           
              //this.setState({toastMessage: error.toString(), toastState: true});
               alert(error);
           })
        
  }

  render(){
    return(
    <>
    <Header title={this.state.action}></Header>    
    <IonContent>

    <div className="ion-text-center App-logo">
    <img src={image} alt="logo" width="25%" /> 
    </div>
    <h1 className="ion-text-center">Regis apis: {this.state.action}</h1>      
        
    <form action="">
    
    <IonItem>
      <IonInput  onIonChange={this.updateEmail} type="email" placeholder="Email"></IonInput>
    </IonItem>
    
    <IonItem>
       <IonInput onIonChange={this.updatePassword} type="password" placeholder="Password"></IonInput>      
    </IonItem>

    </form>      
    <div className="ion-text-center">
    <IonButton className="ion-text-center" onClick={this.login}>{this.state.action}</IonButton> 
    </div>
    <div className="ion-text-center">
      <p>Click here to <a onClick={this.toggleAction}>{this.state.action === 'Login'? 'SignUp' : 'Login'}</a></p> 
    </div>
    </IonContent>
    </>
    )
  }
}
export default LoginPage