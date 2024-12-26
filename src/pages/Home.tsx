import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {IonInputPasswordToggle,IonIcon,IonTitle,IonInput, IonButton, IonItem, IonLabel,IonText,IonSplitPane,IonCol, IonContent, IonGrid, IonPage, IonRow, IonImg, IonFooter } from '@ionic/react';
import OwnerRegisterModal from '../components/owner/OwnerRegisterModal';
import axios from 'axios';
import {lockClosed, person, fishOutline} from 'ionicons/icons';
interface Props {
  setUser: (user: any) => void;
}

const HomePage: React.FC<Props> = ({setUser}) => {
  const [error,setError] =useState ('');
  const [nationalId, setNationalId] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', {nationalId,password,});

      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        const userRole = response.data.role;
        if (userRole === 3) {history.push('/owner');}
      } 
    } catch (error) {
      setError('نام کاربری یا رمز عبور اشتباه است.');
    }
  };
  return (
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-lg="5">
              <form onSubmit={handleLogin} className="login-form ion-padding">
                <h2>ورود به سیستم</h2>
                {error && <IonText color="danger">{error}</IonText>}

                  <IonInput required label="شماره ملی" labelPlacement="floating"  placeholder="شماره ملی خود را وارد کنید" type="text" value={nationalId} onIonChange={e => setNationalId(e.detail.value!)}>
                    <IonIcon color="dark" slot="start" icon={person} aria-hidden="true"></IonIcon>
                  </IonInput>

                  <IonInput required labelPlacement="floating" label="رمز عبور" placeholder="رمز عبور خود را وارد کنید" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
                    <IonIcon color="dark" slot="start" icon={lockClosed} aria-hidden="true"></IonIcon>

                    <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                  </IonInput>

                <IonButton expand="block" type="submit">
                  ورود به سیستم
                  <IonIcon color="success" slot="end" className="ion-padding-start ion-margin-start" size="large" icon={fishOutline}></IonIcon>
                </IonButton>

                <IonTitle className="signup ion-margin">
                  <h5 className="signup-text">هنوز ثبت نام نکرده ای ؟</h5>
                  <OwnerRegisterModal/>
                </IonTitle>
              </form>
            </IonCol>
            <IonCol size="12" size-lg="7"><div className="login-bg desktop"></div></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
  );
};

export default HomePage;