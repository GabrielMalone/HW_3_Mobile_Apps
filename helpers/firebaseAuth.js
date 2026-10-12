import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        console.log("Account created:", userCredential.user.uid);

        return userCredential.user;

    } catch (error) {
        console.error("Registration failed:", error.message);
        throw error;
    }
};