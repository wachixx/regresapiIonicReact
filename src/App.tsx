import React, { Component } from 'react';

import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import './App.css';
import {
  IonApp, 
  IonPage,
  IonRouterOutlet,
  IonSplitPane
} from '@ionic/react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import HomePage from './pages/HomePage';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
  constructor(props: any){
        super(props);
        }
  render() {
    return (
      <Router>
        <div className="App">        
          <IonApp>
          <IonSplitPane contentId="main"> 
            <IonPage id="main">        
              <IonRouterOutlet>
                <Route exact path="/" component={LoginPage} /> 
                <PrivateRoute exact path="/HomePage" component={HomePage} />             
              </IonRouterOutlet>
            </IonPage>
            </IonSplitPane>
          </IonApp>
        </div>
      </Router>
    );
  }
}

export default App;
