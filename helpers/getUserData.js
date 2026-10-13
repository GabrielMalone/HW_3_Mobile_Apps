import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

const getUserData = async (uid) => {
    // get user's document from Firestore as object
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
        // return fields as javascript object with .data()
        return userSnapshot.data();
    }
    return null;
};

export default getUserData