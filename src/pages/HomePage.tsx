import React from 'react';
import { Redirect, Route } from "react-router-dom";
import {  IonContent,  IonSegment, IonSegmentButton, IonLabel,  IonList} from '@ionic/react'
import Header from '../components/Header';
import UsersCard from '../components/UsersCard';
import { CONFIG } from '../constants';

type Props = { props:any };
type State = { users: Array<any>,redirect: any};

class HomePage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {      
      users: [],
      redirect:null
    };    
  } 
  
  handleLogout = (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );
    if (confirmed) {
      //delete item
      localStorage.clear();
      this.setState({redirect:"/"})
    }
  };

  handleLoadMore = e => {
    e.preventDefault();
    //to do implement load more
  };

  componentDidMount() {       
    fetch(CONFIG.API_ENDPOINT + "users")
      .then(res => res.json())
      .then(
        (res) => {
          console.log(JSON.stringify(res));
          this.setState({           
            users: res.data
          });
        },
        (err) => {
            console.error(err);
        }
      )
  }
  

  render() {
      if (this.state.redirect) {
       return <Redirect to={this.state.redirect} />
      }else{   
        return (
          <>   
          <Header title="Users"></Header>
          <IonContent> 
          <div className="ion-text-center">
            <a onClick={(e: any) => this.handleLogout(e)}>Logout</a>
          </div>
          <IonList>
          {this.state.users.map((user: any) => 
            <UsersCard key={user.id} id={user.id} first_name={user.first_name} last_name={user.last_name} avatar={user.avatar}></UsersCard>
          )}  
          </IonList> 
          </IonContent>    
        </>
        );
    }
    }
  
}

export default HomePage