import { mockPartnerData, mockUserData } from "../data/mockUsers";
// ------------------------------------------------------------------------------
export const stateShape = {

    // user state stuff

    loggedIn : false,
    hasAccount : false,
    uid: null,
    curUser : mockUserData,
    friendsListVisible: false,
    userSettingsVisible: false,
    searchRadius: 1000,
    curLocation: "",
    friends :[],
    curPartner : mockPartnerData,
    favorites : [],
    liked: [],
    disliked: [],
    lastCardSwiped: "",
    profilePic : "",

    // we can set up colors here too and other visuals

    mainAppBgColor : "#050405",

    // ------------------------------------------------------------------------------
    // LOGO STYLING
    // ------------------------------------------------------------------------------
    logoTextSize : 36,
    logoTextFont : "UnicaCustom",
    logoTextColor : "#FFFFFF",
    logoColor_1 : "#19adc149",
    logoColor_2 : "#54063727",

    // ------------------------------------------------------------------------------
    // CARD STYLING
    // ------------------------------------------------------------------------------
    // card header styling ----------------------------------------------------------
    cardBgColor : "#010101",
    cardBorderColor : "#c4bbc5",
    cardShadowColor : "rgba(0, 0, 0, 0.8)",
    // photo styling
    photoListHeight : 180,
    cardImageWidth : 250,
    cardImageHeight : 180,
    // restaurant title 
    cardTitleFontSize : 50,
    cardTitleFontColor : "#EDEADE",
    cardTitleFontFace : "UnicaCustom",
    // price level
    cardPriceLevelFontFace : "UnicaCustom",
    cardPriceLevelFontSize : 40,
    cardPriceLevelFontColor : "#FAA0A0",
    // card bg styling --------------------------------------------------------------
    cardPatternBgColor : "#f800be",
    cardPatternBgBgColor : "#0a0909",
    cardPatternBgHeight : "100%",
    cardPatternBgWidth : "100%",
    cardPatternBgOpacity : 0.2,
    // review styling ---------------------------------------------------------------
    cardStarRatingColor : "#770737", 
    cardStarRatingSize : 40,
    // all the little review boxes
    reviewContainerBgColor : "#100f0f",
    reviewContainerWidth : 200,
    reviewContainerHeight : 180,
    
    reviewDateFontColor : "#c4bbc5",
    reviewDateFontSize : 10,
    reviewDateFontFamily : "OpenCustom",
    // this one not being used 
    reviewSummaryTextColor : "#FFFFF0",

    individualReviewTextColor : "#FFFFFF",
    individualReviewTextSize : 10,
    individualReviewTextFace : "OpenCustom",

    invidualReviewStarsColor: "#FAA0A0",
    invidualReviewStarsSize : 10,

    // ------------------------------------------------------------------------------
    // FRIEND MENU STYLING
    // ------------------------------------------------------------------------------

    friendListBgColor : "#29013fa9",
    friendListMaxHeight : 600,

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

        case "TOGGLE_USER_SETTINGS" :
            return {
                ...state,
                userSettingsVisible: !state.userSettingsVisible
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

        case "LOGGED_IN" : 
            return {
                ...state, 
                loggedIn: true,
                uid: action.uid
            }

        case "LOGGED_OUT" : 
            return {
                ...state,
                loggedIn : false
            }

        case "SET_HAS_ACCOUNT" : 
            return {
                ...state,
                hasAccount : action.hasAccount
            }
        
        default : 
            return state;
    }
}
