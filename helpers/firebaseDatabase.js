import { doc, setDoc, getDoc, arrayUnion, updateDoc, arrayRemove } from "firebase/firestore";
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
export const getMyLikes = async (state) => {
    const userRef = doc(db, "users", state.uid);
    const userLikes = await getDoc(userRef);
    if (userLikes.exists()){
        return userLikes.data().liked;
    }
    return null;
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
export const resetMyPartner = async (uid) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {partnerData: null})
    await updateDoc(userRef, {partnerUID: null})
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
// this is a really lazy approach, can think of something better later
// --------------------------------------------------------------------------------
export const removeMeFromOtherLists = async (state, uid, parnterUID) => {

    if (!state.friendsData) return;

    for (let i = 0; i < state.friendsData.length ; i ++){   
        let id = state.friendsData[i].uid;
        // if not my current partner 
        if (id !== parnterUID){
            const userRef = doc(db, "users", id);
            // remove me from this other person's list
            await updateDoc(userRef, {peopleWaitingToBeMyPartner: arrayRemove(uid)});
        }
    }
}
// --------------------------------------------------------------------------------
export const addMeToTheList = async (uid, partnerUID) => {
    // console.log("adding myself to a list! : ", uid);
    const userRef = doc(db, "users", partnerUID);
    // arrayUnion for spread operation
    await updateDoc(userRef, {peopleWaitingToBeMyPartner: arrayUnion(uid)});
}
// --------------------------------------------------------------------------------
export const checkMyWaitList = async (uid) => {
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);
    return userSnapshot.data().peopleWaitingToBeMyPartner;
}
// --------------------------------------------------------------------------------