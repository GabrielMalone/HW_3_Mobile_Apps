import { FlatList, StyleSheet, Pressable } from "react-native";
import UserProfileBox from "./UserProfileBox.js";
// --------------------------------------------------------------------------------
import {mockFriendsData} from '../../data/mockUsers.js';
// --------------------------------------------------------------------------------
const FriendList = ({state, dispatch}) => {

    const styles = StyleSheet.create({
        friendListContent:{
            position: "absolute",
            bottom: 150,
            right: 65,
            maxHeight: state.friendListMaxHeight,
        },
        friendListContainer:{
            justifyContent: "center",
            padding: 20,
            gap: 10,
            borderTopWidth :3,
            borderBottomWidth: 3,
            borderColor: "white",
            backgroundColor: state.friendListBgColor,
         
        }
        
    });

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

// --------------------------------------------------------------------------------
export default FriendList;