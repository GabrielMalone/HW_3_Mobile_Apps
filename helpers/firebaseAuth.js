import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { createUserProfile } from "./firebaseDatabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
// --------------------------------------------------------------------------------
export const registerUser = async (email, password) => {
    try {
        // firebase creates the account
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        // firebase returns the user object
        // firestore creates a document under users/{uid}
        await createUserProfile(userCredential.user);
        // store a local flag so we know not to keep showing
        // the create user screen when app opens
        await AsyncStorage.setItem("hasAccount", "true");

        return userCredential.user;

    } catch (error) {
        console.error("Registration failed:", error.message);
        throw error;
    }
};
// --------------------------------------------------------------------------------
export const loginUser = async (email, password) => {
    try {
        // Firebase authenticates the existing user
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        // Return the authenticated user
        return userCredential.user;

    } catch (error) {
        console.error("Login failed:", error.message);
        throw error;
    }
};
// --------------------------------------------------------------------------------
export const logOut = async () => {
    // clears persistent login on firebase
    // also triggers dispatch(logout)
    await signOut(auth);
}
// --------------------------------------------------------------------------------