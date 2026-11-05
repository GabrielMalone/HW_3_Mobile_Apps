// --------------------------------------------------------------------------------
export const compareLikes = (myLike, partnerLikes, dispatch) => {
    if (partnerLikes.includes(myLike)){
        dispatch({type: "SET_MATCH_ID", matchedID: myLike});
        return true;
    }
    return false;
}
// --------------------------------------------------------------------------------
export const getMatchedRestaurantObj = (state) => {
    // we need to look through what each user liked
    // find the one place they matched
    // take that id
    // get the whole restaurant obj from that id
    if (!state.partnerData) return;
   
    const myPartnerLikes = state.partnerData?.liked;
    const myLikes = state.liked;
    
    let biggerList = null;
    let smallerList = null;

    let matchedID = null;
 
    if (myLikes.length >= myPartnerLikes.length){

        biggerList = myLikes;
        smallerList = myPartnerLikes;

    } else {

        biggerList = myPartnerLikes;
        smallerList = myLikes;
    }

    for (let i = 0 ; i < smallerList.length ; i ++){
        for (let j = 0 ; j < biggerList.length; j ++){

            if (smallerList[i] === biggerList[j]){
                matchedID = smallerList[i];
                console.log("match id found");
                break;
            }
        }
    }
    const restObj = state.localRestaurantData?.find(item => item.id === matchedID)
    console.log("rest obj found: ", restObj)
    return restObj;
    // y'all this worked hah
}
// --------------------------------------------------------------------------------

