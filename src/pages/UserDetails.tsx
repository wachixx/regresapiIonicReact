import React from 'react';
import { Redirect, Route } from "react-router-dom";
import {  IonContent,  IonSegment, IonSegmentButton, IonLabel,  IonList} from '@ionic/react'
import Header from '../components/Header';
import UsersCard from '../components/UsersCard';
import { CONFIG } from '../constants';

type Props = { props:any };
type State = { user: any, id: number};

class UserDetails extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {      
      user: null,
      id : 0
    };    
  } 
  

  componentDidMount() {       
    fetch(CONFIG.API_ENDPOINT + "users/" + this.state.id)
      .then(res => res.json())
      .then(
        (res) => {
          console.log(JSON.stringify(res));
          this.setState({           
            user: res.data
          });
        },
        (err) => {
            console.error(err);
        }
      )
  }
  render() {
        return (
          <>   
          <Header title={this.state.user.first_name}></Header>
          <IonContent> 
         
          </IonContent>    
        </>
        );
    }
}
export default UserDetails