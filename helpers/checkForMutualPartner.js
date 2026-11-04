

export const checkForMutualPartner = (snapshot,state, dispatch) => {
    if (!snapshot.exists()) return;
    let waitingList = snapshot.data().peopleWaitingToBeMyPartner;
    for (let i = 0 ; i < waitingList.length ; i ++) {
        console.log("waiting while my partner uid is ", state.partnerData?.uid);
        console.log("waitingList[i] ", waitingList[i]);
        if (waitingList[i] === state.partnerData?.uid){
            
            dispatch({
                type: "MUTUAL_PARTNERSHIP", 
                haveMutualPartner: true
            });
            return;
        }  
    }
    dispatch({
        type: "MUTUAL_PARTNERSHIP", 
        haveMutualPartner: false
    });
} 