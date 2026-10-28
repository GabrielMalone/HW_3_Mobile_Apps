import { View, StyleSheet, Pressable, Text } from "react-native";
import { useEffect } from 'react';
import UserProfileBox from "./UserProfileBox.js";
import FriendList from "./FriendList.js";
import { logOut } from "../../helpers/firebaseAuth.js";
import { db } from "../../helpers/firebaseConfig.js";
import { onSnapshot, doc } from "firebase/firestore";
import { clearLikesAndDislikes } from '../../helpers/firebaseDatabase';
import ResetIcon  from '../../assets/svg/ResetIcon.jsx'
// --------------------------------------------------------------------------------
// This holds the current user and the user they are matching things with
// --------------------------------------------------------------------------------
const ProfileArea = ({state, dispatch}) => {
    // ----------------------------------------------------------------------------
    const styles = StyleSheet.create({

        profilesCotainer:{
            width: "100%",
            maxHeight: 125,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            position: "relative",
            gap: 20,
        },

        resetButtonStyle:{
            color: "#FFFFFF"
        },
        
    });
    // ----------------------------------------------------------------------------
    // listen for changes in partner state remotely
    useEffect(() => {
        if (!state.partnerData?.uid) return;
        const unsubscribe = onSnapshot(
            doc(db, "users", state.partnerData.uid),
            // dont send cached data
            { includeMetadataChanges: true },
            (snapshot) => {
                if (snapshot.exists()) {
                    // not sure what doing with this anymore
                    dispatch({
                        type: "UPDATE_PARTNER_DATA",
                        partnerData: snapshot.data()
                    });
                    // check for match here
                    if (snapshot.data().matchMade
                        && !state.matchMade){
                        console.log(`MY PARTNER ${snapshot.data().userName} MADE A MATCH`);
                        dispatch({
                            type:"SET_MATCH_MADE",
                            matchMade: true
                        });
                    }
                }   
            }   
        );
        
        return unsubscribe;

    }, [state.partnerData?.uid]);
    // ----------------------------------------------------------------------------
    return (
        <View style={styles.profilesCotainer}>

            {/*user profile */}
            <Pressable
                onPress={()=>logOut(dispatch)}
                //onPress={()=>dispatch({type: "TOGGLE_USER_SETTINGS"})}
            >
            <UserProfileBox state={state} isUser={true}/>
            </Pressable>

            {/*friends list menu */}
            {state.friendsListVisible ? 
                <FriendList state={state} dispatch={dispatch}/> 
                : null
            }

            {/*reset deck and likes and dislikes */}
            {state.partnerData ?
                <Pressable 
                    style={styles.resetButtonStyle}
                    onPress={async ()=> {
                        dispatch({type: "RESET_LIKED"});
                        await clearLikesAndDislikes(state.uid);
                    }}
                >
                    {/*pressable has press information in its props
                    we can use that to get if user holding down button*/}
                    {
                        ({pressed})=>{
                            return (
                                <>
                                    <ResetIcon color={pressed ? "lime" : "white"} size={48}/>
                                    <Text style={styles.resetButtonStyle}>restart!</Text>
                                </>
                            );
                        }
                    }
                </Pressable>  
                :  
                null
            }
            

            {/*partner profile */}
            <Pressable
                onPress={ async ()=> {
                        dispatch({type: "TOGGLE_FRIENDS_LIST"});
                    }
                }
            >
                <UserProfileBox state={state} isCurPartner={true} isFriendInList={false}/>
            </Pressable>

        </View>
    );
}
// --------------------------------------------------------------------------------
export default ProfileArea;