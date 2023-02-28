import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAyVjVeJoctnPMkvKarbm4phMQ2Viv3LRA",
    authDomain: "crown-clothing-db-44b5b.firebaseapp.com",
    projectId: "crown-clothing-db-44b5b",
    storageBucket: "crown-clothing-db-44b5b.appspot.com",
    messagingSenderId: "320217592005",
    appId: "1:320217592005:web:696ed27d636ba17a0e80ac"
};

const firebaseApp = initializeApp(firebaseConfig);

//gives up provider instance from GoogleAuthProvider
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInfo = {}
) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    //doc takes 3 arguments (1) Database (2) Collection (3) Identifier

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        } catch (error) {
            console.log('error in signin', error)
        }
    };

    return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);