import { FlatList, StyleSheet, Pressable } from "react-native";
import UserProfileBox from "./UserProfileBox.js";
import { clearLikesAndDislikes } from "../../helpers/firebaseDatabase.js";

// --------------------------------------------------------------------------------
const FriendList = ({state, dispatch}) => {

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

    const renderFriends = (profileData) => {

        console.log('friend profileData: ', profileData);

        return (
            <Pressable
                // what happens when click on a friend
                onPress={()=>{
                    dispatch({type:"SET_PARTNER", profileData});
                    dispatch({type:"TOGGLE_FRIENDS_LIST"});
                    // reset likes and dislikes for new round of matching
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

// --------------------------------------------------------------------------------
export default FriendList;