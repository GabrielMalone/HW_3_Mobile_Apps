const unsubscribe = onSnapshot(doc(db, "users", friendUID), (snapshot) => {
    if (snapshot.exists()) {
        const friendData = snapshot.data();
        dispatch({
            type: "UPDATE_FRIEND_DATA",
            friendUID: friendUID,
            friendData: friendData
        });
    }
});