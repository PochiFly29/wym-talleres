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
  useIonRouter,
  useIonToast
} from '@ionic/react';
import { registrarUsuario, iniciarSesion } from '../services/api';
import { guardarSesion } from '../services/sesion';
import { useNavigate } from 'react-router-dom';

// Importamos el mismo CSS del login para reutilizar max-width, márgenes y fuentes
import './LoginPage.css';

const RegistroPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [enviando, setEnviando] = useState(false);
  const router = useIonRouter();
  const navigate = useNavigate();
  const [presentarToast] = useIonToast();

  const handleRegistro = async (evento: React.FormEvent) => {
    evento.preventDefault();

    // Validación de mínimo 8 caracteres
    if (password.length < 8) {
      presentarToast({
        message: 'La contraseña debe tener al menos 8 caracteres',
        color: 'danger',
        duration: 3000,
        position: 'bottom'
      });
      return;
    }

    setEnviando(true);
    try {
      // 1. Registra al usuario en la API
      await registrarUsuario(username, password);

      // 2. Inicia sesión automáticamente
      const sesion = await iniciarSesion(username, password);
      guardarSesion(sesion);

      // 3. Notificación de éxito
      presentarToast({
        message: '¡Cuenta registrada e inicio de sesión exitoso!',
        color: 'success',
        duration: 3000,
        position: 'bottom'
      });

      // 4. Entra directo a las publicaciones
      router.push('/publicaciones', 'root', 'replace');
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
          <IonTitle>Crear cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Usamos className="login" para heredar el ancho de 420px y centrado */}
        <form className="login" onSubmit={handleRegistro}>
          <h1>Crear Cuenta</h1>
          <p>Ingresa tus datos para registrarte en la plataforma.</p>

          <IonList>
            <IonItem>
              <IonInput
                label="Usuario"
                labelPlacement="stacked"
                value={username}
                autocomplete="username"
                placeholder="Elige un nombre de usuario"
                onIonInput={(e) => setUsername(e.detail.value ?? '')}
                required
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Contraseña"
                labelPlacement="stacked"
                type="password"
                value={password}
                autocomplete="new-password"
                placeholder="Mínimo 8 caracteres"
                onIonInput={(e) => setPassword(e.detail.value ?? '')}
                required
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </IonItem>
          </IonList>

          <IonButton type="submit" expand="block" disabled={enviando}>
            Registrarse
          </IonButton>

          <IonButton expand="block" fill="clear" onClick={() => navigate('/login')}>
            ¿Ya tienes cuenta? Inicia sesión
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default RegistroPage;