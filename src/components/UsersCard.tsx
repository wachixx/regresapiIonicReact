import React from 'react';
import {  IonAvatar, IonItem, IonIcon, IonLabel, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption} from '@ionic/react'
import { Link } from 'react-router-dom';
import './UsersCard.css';
import { CONFIG } from '../constants';

type Props = {  
  id:number,
  first_name: string,
  last_name: string,
  avatar: string
}

type State = {  
}

class UsersCard extends React.Component<Props, State> {

  constructor(props: Props){
    super(props);
    this.state = {   
    }
  }

  handleDelete = (id, e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      //delete item
    }
  };
 
  render() {   
      return (
        <>
          <IonItem >
            <IonAvatar slot="start">
              <img src={this.props.avatar} />              
            </IonAvatar>
            <IonLabel>             
              <IonGrid >
                <IonRow>
                  <IonCol class="user" size="6">
                  <Link className="link" to="">
                  {this.props.first_name} {this.props.last_name}</Link>                     
                  </IonCol>
                  <IonCol  size="6" text-right>                  
                     <button className="link">Update</button>
                     <button className="link" onClick={(e: any) => this.handleDelete(this.props.id,e)} >Delete</button>        
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>  
        </>               
      );    
  }
}

export default UsersCard