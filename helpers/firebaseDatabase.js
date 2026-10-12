import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
// --------------------------------------------------------------------------------
// doc(db, "users", user.uid) identifies the document we want to write.
// setDoc() creates that document and saves the information inside it.
// --------------------------------------------------------------------------------
export const createUserProfile = async (user) => {
    await setDoc(doc(db, "users", user.uid), {
        curUser: {
            userName: "",
            fname: "",
            lname: "",
            email: user.email,
            profilePic: "p1",
            likedRestaurants: [],
        },
        searchRadius: 1000,
        friends: [],
        partnerUid: null,
        favorites: [],
        liked: [],
        disliked: [],
        lastCardSwiped: "",
    });
};