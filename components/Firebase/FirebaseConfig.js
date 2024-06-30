import { Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import { initializeAuth, signInWithEmailAndPassword, signOut, getReactNativePersistence, getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, getDoc, getDocs, doc, addDoc, collection, query, where } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCKR-2O2aH0CgpeFKRplN0HrmgI-7XQEUM',
    authDomain: "torsion-b8810.firebaseapp.com",
    projectId: "torsion-b8810",
    storageBucket: "torsion-b8810.appspot.com",
    messagingSenderId: "469512816224",
    appId: "1:469512816224:web:f0a569945a5a947933a505"
};

const firebase_app = initializeApp(firebaseConfig);
let firebase_auth = null;
try {
    if (Platform.OS !== 'web') {
        firebase_auth = initializeAuth(firebase_app, {
            persistence: getReactNativePersistence(ReactNativeAsyncStorage)
        });
    } else {
        firebase_auth = getAuth(firebase_app);
    }
} catch (error) {}
const db = getFirestore(firebase_app);

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

export async function make_request(recipient_num, comp_id) {
    console.log("recnum: ", recipient_num);
    try {
        const requester = await fetch_uid_team();
        console.log("requester: ", requester);
        const ref = await addDoc(collection(db, 'requests'), {
            requester: requester,
            requested: recipient_num,
            event: comp_id,
            accepted: false,
        });
        console.log("ref: ", ref);
        if (ref) return true;
    } catch (error) {
        console.log(":(", error.message);
        return false;
    }
}

export async function view_sent_requests(comp_id) {
    console.log(comp_id);
    console.log("db", db);
    console.log(firebase_auth);
    try {
        const requester = await fetch_uid_team();
        console.log("requester: ", requester);
        const Query = query(
            collection(db, 'requests'),
            where('requester', '==', requester),
            where('event', '==', comp_id)
        );
        console.log("here");
        const response = await getDocs(Query);
        console.log("response: ", response);
        const results = [];
        console.log("results: ", results);
        response.forEach((doc) => {
            results.push({
                id: doc.id,
                requested: doc.data().requested,
                accepted: doc.data().accepted,
            });
        });
        console.log("results: ", results);
        return results;
    } catch (error) {
        console.log("error: ", error.message);
        return false;
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
