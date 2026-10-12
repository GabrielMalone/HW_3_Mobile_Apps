// ------------------------------------------------------------------------------
export const stateShape = {
    curUser : {
        userName: "",
        fristName: "",
        lastName: "",
        email: "",
    },
    friendsListVisible: false,
    userProfileSettingsVisible: false,
    searchRadius: 1000,
    curLocation: "",
    friends :[],
    curPartner : {},
    favorites : [],
    swipedRightThisSession: [],
};
// ------------------------------------------------------------------------------
export const reducer = (state, action) => {

    switch(action)
    {
        default : return state;
    }
}
