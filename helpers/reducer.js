import { mockPartnerData, mockUserData } from "../data/mockUsers";
// ------------------------------------------------------------------------------
export const stateShape = {
    curUser : mockUserData,
    friendsListVisible: false,
    userProfileSettingsVisible: false,
    searchRadius: 1000,
    curLocation: "",
    friends :[],
    curPartner : mockPartnerData,
    favorites : [],
    swipedRightThisSession: [],
};
// ------------------------------------------------------------------------------
export const reducer = (state, action) => {

    switch(action.type)
    {
        case "TOGGLE_FRIENDS_LIST" : 
            return {
                ...state, 
                friendsListVisible: !state.friendsListVisible
            }
        case "SET_PARTNER" : 
            return {
                ...state,
                curPartner : action.value 
            }
        default : return state;
    }
}
