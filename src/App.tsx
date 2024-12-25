import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import { IonApp,IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, setupIonicReact, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { playCircle, radio, library, search } from 'ionicons/icons';
import Home from './pages/HomePage';
import './styles.css';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import OwnerPage from './pages/owner/OwnerPanel';
import ManageVessel from './pages/owner/ManageVessel';
import { useState } from 'react';
import Header from './components/Header';
import InvoiceDetails from './pages/owner/InvoiceDetails';


setupIonicReact();

const App: React.FC = () => {
  const [user, setUser] = useState(null);
  return (
  <IonApp>
    <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home"><Home setUser={setUser}/></Route>
          <Route exact path="/"><Redirect to="/home" /></Route>
          <Route exact path="/owner"><OwnerPage user={user} /></Route>
          <Route exact path="/owner/manage-vessel/:id" component={ManageVessel} />
          <Route exact path="/owner/vessel/invoices/details/:id" component={InvoiceDetails} />
        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);
};

export default App;
