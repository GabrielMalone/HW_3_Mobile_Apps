import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth"
// --------------------------------------------------------------------------------
const logOut = async () => {
    // clears persistent login on firebase
    // also triggers dispatch(logout)
    await signOut(auth);
}
// --------------------------------------------------------------------------------
export default logOut;