import { View, StyleSheet, Pressable } from "react-native";
import UserProfileBox from "./UserProfileBox.js";
import FriendList from "./FriendList.js";
import { logOut } from "../../helpers/firebaseAuth.js";

// --------------------------------------------------------------------------------
// This holds the current user and the user they are matching things with
// --------------------------------------------------------------------------------
const ProfileArea = ({state, dispatch}) => {

    return (
        <View style={styles.profilesCotainer}>

            {/*user profile */}
            <Pressable
                onPress={logOut}
                //onPress={()=>dispatch({type: "TOGGLE_USER_SETTINGS"})}
            >
            <UserProfileBox state={state} isUser={true}/>
            </Pressable>

            {/*friends list menu */}
            {state.friendsListVisible ? 
                <FriendList state={state} dispatch={dispatch}/> 
                : null
            }

            {/*partner profile */}
            <Pressable
                onPress={ async ()=> {
                        dispatch({type: "TOGGLE_FRIENDS_LIST"});
                    }
                }
            >
                <UserProfileBox state={state} isCurPartner={true}/>
            </Pressable>
        </View>
    );
}
// --------------------------------------------------------------------------------
const styles = StyleSheet.create({
    profilesCotainer:{
        width: "100%",
        maxHeight: 125,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
        position: "relative",
    },
});
// --------------------------------------------------------------------------------
export default ProfileArea;