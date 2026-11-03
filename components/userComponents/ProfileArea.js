import { View, StyleSheet, Pressable, Text } from "react-native";
import { useEffect, useState } from 'react';
import UserProfileBox from "./UserProfileBox.js";
import FriendList from "./FriendList.js";
import { logOut } from "../../helpers/firebaseAuth.js";
import { db } from "../../helpers/firebaseConfig.js";
import { onSnapshot, doc } from "firebase/firestore";
// --------------------------------------------------------------------------------
// This holds the current user and the user they are matching things with
// --------------------------------------------------------------------------------
const ProfileArea = ({state, dispatch}) => {

    const [shouldDisplayPartneredFx, setShouldDisplayPartneredFx] = useState(false);

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
            zIndex : 20,
            backgroundColor : shouldDisplayPartneredFx ? "green" : null
        },

        resetButtonStyle:{
            color: "#FFFFFF"
        },
        
    });
    // ----------------------------------------------------------------------------
    // once we have a partner picked
    // listen for changes in partner state remotely
    // with firebase built in listener onSnapShot
    // this is obviously way too much information to send someone who has not
    // even agreed to be this person's partner...but for now whatever
     // ----------------------------------------------------------------------------
    useEffect(() => {

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
                    if (snapshot.data().partnerUID){
                        console.log("my id: ", state.uid);
                        console.log("my selected parnter's id: ", state.partnerData?.uid);
                        console.log("my partner's partner: ", snapshot.data().partnerUID);
                        if (state.uid === snapshot.data().partnerUID){
                            console.log("IM PARTNERED UP!");
                            setShouldDisplayPartneredFx(true);
                        } else {
                            setShouldDisplayPartneredFx(false);
                        }
                    }
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
                onPress={()=>dispatch({type: "TOGGLE_USER_SETTINGS"})}
            >
            <UserProfileBox 
                state={state} 
                dispatch={dispatch} 
                isUser={true}
            />
            </Pressable>

            {/*partner profile */}
            <Pressable
                onPress={ async ()=> {
                        dispatch({type: "TOGGLE_FRIENDS_LIST"});
                    }
                }
            >
                <UserProfileBox
                    state={state} 
                    dispatch={dispatch}
                    isCurPartner={true} 
                    isFriendInList={false}
                />
            </Pressable>
        </View>
    );
}
// --------------------------------------------------------------------------------
export default ProfileArea;