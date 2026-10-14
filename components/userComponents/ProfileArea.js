import { View, StyleSheet, Pressable } from "react-native";
import { useEffect } from 'react';
import UserProfileBox from "./UserProfileBox.js";
import FriendList from "./FriendList.js";
import { logOut } from "../../helpers/firebaseAuth.js";
import { db } from "../../helpers/firebaseConfig.js";
import { onSnapshot, doc } from "firebase/firestore";
// --------------------------------------------------------------------------------
// This holds the current user and the user they are matching things with
// --------------------------------------------------------------------------------
const ProfileArea = ({state, dispatch}) => {
    // listen for partner likes remotely
    useEffect(() => {
        // console.log("listening to local partner?", 
        //     JSON.stringify(state.partnerData, null, 2));
        if (!state.partnerData?.uid) return;
        const unsubscribe = onSnapshot(
            doc(db, "users", state.partnerData.uid),
            // dont send cached data
            { includeMetadataChanges: true },
            (snapshot) => {
                if (snapshot.exists()) {
                    dispatch({
                        type: "UPDATE_PARTNER_DATA",
                        partnerData: snapshot.data()
                    });
                }
            }
        );

        

        return unsubscribe;
    }, [state.partnerData?.uid]);


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