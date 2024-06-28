import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function logged_in() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) return true;
        else return false;
    });
}
