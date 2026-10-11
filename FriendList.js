import { View, FlatList, StyleSheet } from "react-native";
import UserProfileBox from "./UserProfileBox";
// --------------------------------------------------------------------------------
import { mockFriendsData } from "./data/mockUsers";
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
        bottom: 120,
        right: 65,
        borderWidth: 1,
        borderRadius: 10, 
        borderColor: "white",
        backgroundColor: "#5f00ad8b",
        zIndex: 1,
    },
    friendListContainer:{
        justifyContent: "center",
        padding: 20,
    }
    
});
// --------------------------------------------------------------------------------
export default FriendList;