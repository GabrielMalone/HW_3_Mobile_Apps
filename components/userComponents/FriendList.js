import { FlatList, StyleSheet } from "react-native";
import UserProfileBox from "./UserProfileBox.js";
// --------------------------------------------------------------------------------
import {mockFriendsData} from '../../data/mockUsers.js';
// --------------------------------------------------------------------------------
const FriendList = () => {
    // how each friend will look in the list
    const renderFriends = (profilePic) => {
        return (
            <UserProfileBox 
                profilePic={profilePic}
            />
        );
    }   
    return (
        <FlatList 
            scrollsToTop={true}
            style={styles.friendListContent}
            contentContainerStyle={styles.friendListContainer}
            data={mockFriendsData}
            renderItem={
                ({item})=>{
                    return (
                        renderFriends(item.profilePic)
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