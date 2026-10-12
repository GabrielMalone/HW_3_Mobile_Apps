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
    liked: [],
    disliked: [],
    lastCardSwiped: "",
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
                curPartner : action.profileData 
            }

        case "LIKED" :
            return {
                ...state,
                liked: [...state.liked, action.placeId]
            }

        case "DISLIKED" :
            return {
                ...state,
                disliked: [...state.disliked, action.placeId]
            }

        case "RESET_LIKED" :
            return {
                ...state,
                liked : []
            }

        default : return state;
    }
}
