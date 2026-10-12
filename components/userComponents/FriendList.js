import { FlatList, StyleSheet, Pressable } from "react-native";
import UserProfileBox from "./UserProfileBox.js";
// --------------------------------------------------------------------------------
import {mockFriendsData} from '../../data/mockUsers.js';
// --------------------------------------------------------------------------------
const FriendList = ({state, dispatch}) => {

    const renderFriends = (profileData) => {
        return (
            <Pressable
                // what happens when click on a friend
                onPress={()=>{
                    dispatch({type:"SET_PARTNER", profileData});
                    dispatch({type:"TOGGLE_FRIENDS_LIST"});
                }}
            >
                <UserProfileBox 
                    profileData={profileData}
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
            data={mockFriendsData}
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
const styles = StyleSheet.create({
    friendListContent:{
        position: "absolute",
        bottom: 150,
        right: 65,
        borderRadius: 10, 
        backgroundColor: "#29013fbe",
        zIndex: 1,
        maxHeight: 500,
    },
    friendListContainer:{
        justifyContent: "center",
        padding: 20,
        gap: 10,
    }
    
});
// --------------------------------------------------------------------------------
export default FriendList;