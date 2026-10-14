import { FlatList, StyleSheet, Pressable } from "react-native";
import { useEffect } from "react";
import UserProfileBox from "./UserProfileBox.js";
import { clearLikesAndDislikes, updateUserPartnerInfo } from "../../helpers/firebaseDatabase.js";

// --------------------------------------------------------------------------------
const FriendList = ({state, dispatch}) => {
    // every time we get a partner, we need to listen
    // to their likes remotely
    // ----------------------------------------------------------------------------
    const styles = StyleSheet.create({
        friendListContent:{
            position: "absolute",
            bottom: 110,
            right: 89,
            maxHeight: state.friendListMaxHeight,
        },
        friendListContainer:{
            justifyContent: "center",
            padding: 0,
            gap: 10,
            borderTopWidth :1,
            borderBottomWidth: 1,
            borderColor: "white",
            backgroundColor: state.friendListBgColor,
        }
    });
    // ----------------------------------------------------------------------------
    const renderFriends = (profileData) => {
        // oh ok i need to send this to firestore as well
        return (
            <Pressable
                // what happens when click on a friend
                onPress={ async ()=>{
                    dispatch({
                        type:"SET_PARTNER", 
                        partnerData: profileData
                    });
                    dispatch({type:"TOGGLE_FRIENDS_LIST"});
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