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
  apiKey: "AIzaSyCppQq0d4_jFAgQBYfx09_zjUqYFCUkbdY",
  authDomain: "charley-95c57.firebaseapp.com",
  projectId: "charley-95c57",
  storageBucket: "charley-95c57.appspot.com",
  messagingSenderId: "392427568631",
  appId: "1:392427568631:web:e42b001497973a9dbbc2f2",
  measurementId: "G-E9JD7QTJGT"
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
