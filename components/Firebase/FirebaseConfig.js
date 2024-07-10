import { Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import { initializeAuth, signInWithEmailAndPassword, signOut, getReactNativePersistence, getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, getDoc, getDocs, doc, addDoc, collection, query, where, updateDoc } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCKR-2O2aH0CgpeFKRplN0HrmgI-7XQEUM',
    authDomain: "torsion-b8810.firebaseapp.com",
    projectId: "torsion-b8810",
    storageBucket: "torsion-b8810.appspot.com",
    messagingSenderId: "469512816224",
    appId: "1:469512816224:web:f0a569945a5a947933a505"
};

let firebase_app = null;
let firebase_auth = null;
let db = null;

export async function init_all_firebase() {
    try {
        firebase_app = initializeApp(firebaseConfig);
        db = getFirestore(firebase_app);
        if (Platform.OS !== 'web') {
            firebase_auth = initializeAuth(firebase_app, {
                persistence: getReactNativePersistence(ReactNativeAsyncStorage)
            });
        } else {
            firebase_auth = getAuth(firebase_app);
        }
        return true;
    } catch (error) {
        return error;
    }
}

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
    try {
        const requester = await fetch_uid_team();
        const ref = await addDoc(collection(db, 'requests'), {
            requester: requester,
            requested: recipient_num,
            event: comp_id,
            accepted: false,
        });
        if (ref) return true;
    } catch (error) {
        return false;
    }
}

export async function accept_req(id) {
    try {
        const doc_to_be_updated = doc(db, 'requests', id);
        await updateDoc(doc_to_be_updated, {
            accepted: true
        });
        return true;
    } catch (error) {
        return false;
    }
}
        

export async function view_sent_requests(comp_id) {
    try {
        const requester = await fetch_uid_team();
        const Query = query(
            collection(db, 'requests'),
            where('requester', '==', requester),
            where('event', '==', comp_id)
        );
        const response = await getDocs(Query);
        const results = [];
        response.forEach((doc) => {
            results.push({
                id: doc.id,
                requested: doc.data().requested,
                accepted: doc.data().accepted,
            });
        });
        return results;
    } catch (error) {
        return false;
    }
}

export async function view_received_requests(comp_id) {
    try {
        const requested = await fetch_uid_team();
        const Query = query(
            collection(db, 'requests'),
            where('requested', '==', requested),
            where('event', '==', comp_id)
        );
        const response = await getDocs(Query);
        const results = [];
        response.forEach((doc) => {
            results.push({
                id: doc.id,
                requester: doc.data().requester,
                accepted: doc.data().accepted,
            });
        });
        return results;
    } catch (error) {
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
