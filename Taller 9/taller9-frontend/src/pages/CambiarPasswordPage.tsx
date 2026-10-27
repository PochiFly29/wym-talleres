import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  useIonToast
} from '@ionic/react';
import { cambiarPassword } from '../services/api';
import { useNavigate } from 'react-router-dom';

import './LoginPage.css';

const CambiarPasswordPage: React.FC = () => {
  const [actual, setActual] = useState('');
  const [nueva, setNueva] = useState('');
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();
  const [presentarToast] = useIonToast();

  const handleCambiar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (nueva.length < 8) {
      presentarToast({
        message: 'La nueva contraseña debe tener al menos 8 caracteres',
        color: 'danger',
        duration: 3000,
        position: 'bottom'
      });
      return;
    }

    setEnviando(true);
    try {
      await cambiarPassword(actual, nueva);
      presentarToast({
        message: '¡Contraseña actualizada con éxito!',
        color: 'success',
        duration: 3000,
        position: 'bottom'
      });
      // Vuelve a la página de publicaciones tras cambiarla
      navigate('/publicaciones', { replace: true });
    } catch (error) {
      presentarToast({
        message: error instanceof Error ? error.message : String(error),
        color: 'danger',
        duration: 3000,
        position: 'bottom'
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/publicaciones" />
          </IonButtons>
          <IonTitle>Cambiar contraseña</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <form className="login" onSubmit={handleCambiar}>
          <h1>Actualizar Clave</h1>
          <p>Ingresa tu contraseña actual y la nueva que deseas usar.</p>

          <IonList>
            <IonItem>
              <IonInput
                label="Contraseña Actual"
                labelPlacement="stacked"
                type="password"
                value={actual}
                placeholder="Tu clave actual"
                onIonInput={(e) => setActual(e.detail.value ?? '')}
                required
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label="Nueva Contraseña"
                labelPlacement="stacked"
                type="password"
                value={nueva}
                placeholder="Mínimo 8 caracteres"
                onIonInput={(e) => setNueva(e.detail.value ?? '')}
                required
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </IonItem>
          </IonList>

          <IonButton type="submit" expand="block" disabled={enviando}>
            Guardar Cambios
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CambiarPasswordPage;