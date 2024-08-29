import { Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import { initializeAuth, signInWithEmailAndPassword, signOut, getReactNativePersistence, getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { or, and, Timestamp, getFirestore, getDoc, getDocs, doc, addDoc, collection, query, where, updateDoc, orderBy } from '@firebase/firestore';

let team_number = null;

const firebaseConfig = {
    apiKey: 'AIzaSyCKR-2O2aH0CgpeFKRplN0HrmgI-7XQEUM',
    authDomain: "torsion-b8810.firebaseapp.com",
    projectId: "torsion-b8810",
    storageBucket: "torsion-b8810.appspot.com",
    messagingSenderId: "469512816224",
    appId: "1:469512816224:web:f0a569945a5a947933a505"
};

let firebase_app = null;
export let firebase_auth = null;
let db = null;
let inited = false;

export async function init_all_firebase() {
    try {
        firebase_app = initializeApp(firebaseConfig);
        if (Platform.OS !== 'web') {
            firebase_auth = initializeAuth(firebase_app, {
                persistence: getReactNativePersistence(ReactNativeAsyncStorage)
            });
        } else {
            firebase_auth = getAuth(firebase_app);
        }
        db = getFirestore(firebase_app);
        inited = true;
        return true;
    } catch (error) {
        return false;
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
        team_number = null;
        await signOut(firebase_auth);
        return true;
    } catch (error) {
        return false;
    }
}

export async function fetch_uid_team() {
    if (team_number != null) return team_number;
    console.log("firebasing...");
    try {
        const email = firebase_auth.currentUser.email;
        const doc_ref = doc(db, 'users', email);
        const Doc = await getDoc(doc_ref);
        if (Doc.exists()) {
            team_number = Doc.data().number;
            return team_number;
        }
        return '';
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
    return false;
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

export async function send_msg (recipient_num, content) {
    try {
        const requester = await fetch_uid_team();
        const ref = await addDoc(collection(db, 'messages'), {
            sender: requester,
            receiver: recipient_num,
            content: content,
            timestamp: Timestamp.fromDate(new Date()),
        });
        if (!ref) return false;
        const ref_2 = await addDoc(collection(db, 'seen'), {
            from: requester,
            to: recipient_num,
            read: false
        });
        if (ref_2) return true;
    } catch (error) {
        return false;
    }
}

export async function view_msgs(other_team) {
    try {
        const team = await fetch_uid_team();
        const Query = query(
            collection(db, 'messages'),
            or(
                and(
                    where('sender', '==', team),
                    where('receiver', '==', other_team),
                ),
                and(
                    where('sender', '==', other_team),
                    where('receiver', '==', team),
                )
            ),
            orderBy('timestamp')
        );
        const response = await getDocs(Query);
        const results = [];
        response.forEach((doc) => {
            results.push({
                id: doc.id,
                sender: doc.data().sender,
                content: doc.data().content
            });
        });

        const seen_query = query(
            collection(db, 'seen'),
            where('from', '==', other_team),
            where('to', '==', team),
            where('read', '==', false),
        );
        const response_2 = await getDocs(seen_query);
        const results_2 = [];
        response_2.forEach((doc) => results_2.push(doc.id));
        for (id of results_2) {
            const doc_to_be_updated = doc(db, 'seen', id);
            await updateDoc(doc_to_be_updated, {
                read: true
            });
        }

        return results;
    } catch (error) {
        return false;
    }
}

export async function view_unreads() {
    try {
        let team;
        if (team_number !== null) team = team_number;
        else team = await fetch_uid_team();
        const Query = query(
            collection(db, 'seen'),
            and(
                where('to', '==', team),
                where('read', '==', false),
            )
        );
        const response = await getDocs(Query);
        const results = [];
        let empty = true;
        response.forEach((doc) => {
            empty = false;
            results.push(doc.data().from);
        });
        if (empty) return false;
        const unreads = [...new Set(results)];
        return unreads;
    }
    catch (error) {
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
