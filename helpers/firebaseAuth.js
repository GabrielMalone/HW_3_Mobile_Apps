import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { createUserProfile } from "./firebaseDatabase";
// --------------------------------------------------------------------------------
const registerUser = async (email, password) => {
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
        
        console.log("Account created:", userCredential.user);
        
        return userCredential.user;

    } catch (error) {
        console.error("Registration failed:", error.message);
        throw error;
    }
};
// --------------------------------------------------------------------------------
export default registerUser