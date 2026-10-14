import { doc, setDoc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
// --------------------------------------------------------------------------------
// doc(db, "users", user.uid) identifies the document we want to write.
// setDoc() creates that document and saves the information inside it.
// --------------------------------------------------------------------------------
export const createUserProfile = async (user) => {
    await setDoc(doc(db, "users", user.uid), {
        userName: "",
        fname: "",
        lname: "",
        email: user.email,
        profilePic: "p1",
        searchRadius: 1000,
        friends: [],
        partnerData: null,
        liked: [],
        disliked: [],
        lastCardSwiped: null,
    });
};
// --------------------------------------------------------------------------------
export const getUserData = async (uid) => {
    // get user's document from Firestore as object
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
        // return fields as javascript object with .data()
        return userSnapshot.data();
    }
    return null;
};
// --------------------------------------------------------------------------------
export const setUserLikes = async (uid, likedItemId) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {liked: arrayUnion(likedItemId)});
}
// --------------------------------------------------------------------------------
export const setUserDislikes = async (uid, likedItemId) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {disliked: arrayUnion(likedItemId)});
}
// --------------------------------------------------------------------------------
export const clearLikesAndDislikes = async (uid) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {disliked: [], liked: [], matchMade: false});
}
// --------------------------------------------------------------------------------
export const alertPartnerOfMatch = async (partnerUID) => {
    const userRef = doc(db, "users", partnerUID);
    await updateDoc(userRef,{matchMade: true});
}
// --------------------------------------------------------------------------------
export const getFriendsData = async (state) => {
    // current state should have friends list already loaded 
    // promise all needed to async arrays
    const friends = await Promise.all(
        state.friends.map( async (friendUID)=>{
            const friendRef = doc(db, "users", friendUID); 
            const curFriend = await getDoc(friendRef);
            return {
                uid: friendUID,
                ...curFriend.data()
            }
        })
    ); 
    return friends;
}
// --------------------------------------------------------------------------------
export const updateUserPartnerInfo = async (userUID, partnerUID) => {
    // get reference to particular document
    const userRef = doc(db, "users", userUID);
    // update that document
    await updateDoc(userRef, {partnerUID: partnerUID});
}
// --------------------------------------------------------------------------------
export const partnered = (state) => {
    // is my uid my partner's partner uid
    const myuid = state?.uid;
    const myPartnersPartnerId = state?.partnerData?.partnerUID; 
    // console.log(`myname: ${state.userName} 
    //     myUID: ${myuid}
    //     mypartnersPartnerUID: ${myPartnersPartnerId}`);
    // if match then can start swiping and have both notified of any matches
    return myuid === myPartnersPartnerId;
}