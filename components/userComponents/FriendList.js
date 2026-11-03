import { FlatList, StyleSheet, Pressable } from "react-native";
import UserProfileBox from "./UserProfileBox.js";
import { clearLikesAndDislikes, updateUserPartnerInfo, partnered } from "../../helpers/firebaseDatabase.js";

// --------------------------------------------------------------------------------
const FriendList = ({state, dispatch}) => {
    // ----------------------------------------------------------------------------
    const styles = StyleSheet.create({
        friendListContent:{
            position: "absolute",
            bottom: 110,
            right: 0,
            maxHeight: 500,
            zIndex: 20,
        },
        friendListContainer:{
            justifyContent: "center",
            padding: 0,
            gap: 10,
            borderTopWidth :0,
            borderBottomWidth: 0,
            borderColor: "white",
            backgroundColor: "#ff00cc12",
            zIndex: 20,
        }
    });
    // ----------------------------------------------------------------------------
    // so this takes all the friends data that gets downloaded at the load of the app 
    // (not very efficient i know)
    // and then finds the data for that friend 
    // and sets it as the partner data if you click that friend
    // ----------------------------------------------------------------------------
    const renderFriends = (profileData) => {
        // oh ok i need to send this to firestore as well
        return (
            <Pressable
                // what happens when click on a friend
                onPress={ async ()=>{
                    dispatch({
                        type: "SET_PARTNER", 
                        partnerData: profileData
                    });
                    dispatch({
                        type : "RESET_LIKED"
                    });
                    dispatch({
                        type: "TOGGLE_FRIENDS_LIST"
                    });
                    // tell backend I have this partner
                    await updateUserPartnerInfo(state.uid, profileData.uid);
                    // reset likes and dislikes for new round of matching
                    // would need to notify partner that they are in a new pair though 
                    // before clearing theirs
                    clearLikesAndDislikes(state.uid);
                }}
            >
                <UserProfileBox 
                    // i really need to fix the shape of the user object it's ugly
                    state={profileData}
                    isFriendInList={true}
                />
            </Pressable>
        );
    }   
    // how each friend will look in the list
    return (
        <FlatList 
            scrollsToTop={true}
            style={styles.friendListContent}
            contentContainerStyle={styles.friendListContainer}
            data={state.friendsData}
            renderItem={
                ({item})=>{
                    return (
                        renderFriends(item)
                    );
                }
            }
        />
    );
}
// --------------------------------------------------------------------------------
export default FriendList;