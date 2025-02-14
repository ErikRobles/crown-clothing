import {initializeApp} from 'firebase/app'
import {getAuth, signInWithPopup, GoogleAuthProvider, User} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'



const firebaseConfig = {
    apiKey: "AIzaSyCUA03q8yu8bHLwoU_Bg77OwjfkI5dAG2M",
    authDomain: "crown-clothing-db-4aaed.firebaseapp.com",
    projectId: "crown-clothing-db-4aaed",
    storageBucket: "crown-clothing-db-4aaed.firebasestorage.app",
    messagingSenderId: "293487546670",
    appId: "1:293487546670:web:f4c276ee3771c732d7aabf"
  };
  
  // Initialize Firebase
  export const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth: User) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot);
    console.log(userSnapShot.exists());
    if(!userSnapShot.exists()) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch (error) {
        if (error instanceof Error) {
               console.log('There was a problem creating user ', error.message);
             } else {
               console.log('There was a problem creating user ', String(error));
          }
      }
      return userDocRef;
    }

  }