import { initializeApp } from 'firebase/app';
import { initializeAuth, signInWithEmailAndPassword, signOut, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, getDoc, doc } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCKR-2O2aH0CgpeFKRplN0HrmgI-7XQEUM',
    authDomain: "torsion-b8810.firebaseapp.com",
    projectId: "torsion-b8810",
    storageBucket: "torsion-b8810.appspot.com",
    messagingSenderId: "469512816224",
    appId: "1:469512816224:web:f0a569945a5a947933a505"
};

const firebase_app = initializeApp(firebaseConfig);
const firebase_auth = initializeAuth(firebase_app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default async function authenticate_firebase(email, pwd) {
    try {
        const userCredential = await signInWithEmailAndPassword(firebase_auth, email, pwd);
        return userCredential.user.email;
    }
    catch (error) {
        //const error_code = error.code;
        //const error_msg = error.message;
        //return `${error_code}: ${error_msg}`;
        return false;
    }
}

export async function firebase_logout() {
    try {
        await signOut(firebase_auth);
        return true;
    } catch (error) {
        return false;
    }
}

export async function fetch_uid_team() {
    try {
        const db = getFirestore(firebase_app);
        const email = firebase_auth.currentUser.email;
        const doc_ref = doc(db, 'users', email);
        const Doc = await getDoc(doc_ref);
        if (Doc.exists()) return Doc.data().number;
        else return '';
    }
    catch (error) {
        return 'error';
    }
}

export async function user_logged_in() {
    const user = firebase_auth.currentUser;
    if (user) {
        const team_num = await fetch_uid_team();
        return team_num;
    } else {
        return false;
    }
}
