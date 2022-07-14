import { getAuth } from "firebase/auth";
import {
  initializeFirestore,
  enableIndexedDbPersistence,
  getFirestore,
} from "firebase/firestore";
import {
  FirebaseAppProvider,
  AuthProvider,
  useFirebaseApp,
  useInitFirestore,
  FirestoreProvider,
} from "reactfire";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

const firebaseConfig = {
  apiKey: "AIzaSyDffLofon3lwcW2ZO5pCZZUYplPO9ADmdw",
  authDomain: "empleame-13c73.firebaseapp.com",
  projectId: "empleame-13c73",
  storageBucket: "empleame-13c73.appspot.com",
  messagingSenderId: "249874802555",
  appId: "1:249874802555:web:5e0b338aceb103da36ffde",
};

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseSetupComponent Component={Component} pageProps={pageProps} />
    </FirebaseAppProvider>
  );
}

function FirebaseSetupComponent({ Component, pageProps }) {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const firestoreInstance = getFirestore(app);
  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestoreInstance}>
        <Toaster/>
          <Component {...pageProps} />
      </FirestoreProvider>
    </AuthProvider>
  );
}

export default MyApp;
