import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: 'AIzaSyCKR-2O2aH0CgpeFKRplN0HrmgI-7XQEUM',
    authDomain: "torsion-b8810.firebaseapp.com",
    projectId: "torsion-b8810",
    storageBucket: "torsion-b8810.appspot.com",
    messagingSenderId: "469512816224",
    appId: "1:469512816224:web:f0a569945a5a947933a505"
};

const firebase_app = initializeApp(firebaseConfig);
const firebase_auth = getAuth(firebase_app);

export default async function authenticate_firebase(email, pwd) {
    await signInWithEmailAndPassword(firebase_auth, email, pwd)
        .then((userCredential) => {
            return userCredential.user;
        })
        .catch((error) => {
            const error_code = error.code;
            const error_msg = error.message;
            return false;
        });
}
