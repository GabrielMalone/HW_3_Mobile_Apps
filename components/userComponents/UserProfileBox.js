import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { profilePics } from "../../data/mockUsers";
import AddUserIcon from "../../assets/svg/AddUserIcon";
import TruchetPattern from "../../assets/svg/TruchetPattern.jsx";
import SettingsIcon from "../../assets/svg/SettingsIcon.jsx";
// --------------------------------------------------------------------------------
// This box is the smallest unit that contains the user profile image
// --------------------------------------------------------------------------------
const SettingsButton = ({styles}) => {
    return (
        <Pressable style={styles.settingsIconStyle}>
            <SettingsIcon color="#FFFFFF" size={36}/>
        </Pressable> 
    );
}
// --------------------------------------------------------------------------------
const UserProfileBox = ({state, isUser=false, isCurPartner=false, isFriendInList=false}) => {

    const styles = StyleSheet.create({
        profileContainer: {
            borderRadius: 10,
            borderColor: "#ffffff",
            borderWidth: 1,
            margin: 5,
            position: "relative",
            alignItems: "center",
            backgroundColor: "#0a0a0a",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.65)",
            overflow: "hidden",
        },
        pickAPartnerbox :{
            flexDirection: "column",
            width: 100,
            height: 120,
            alignItems : "center",
            justifyContent: "center",
            padding:  1,
            backgroundColor: "#121111",
            borderRadius: 10,
        },
        pickAPartnerText:{
            textAlign: "center",
            fontFamily: "OpenCustom",
            fontSize: 12,
            color: "#ffffff",
        },
        photo:{
            width: 100,
            height: 100,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
        },
        userName :{
            fontFamily: "OpenCustom",
            fontSize: 12,
            color: "#ffffff",
        },
        bgPattern:{
            position: "absolute",
            top: 0,
            left: 0,
        },
        settingsIconStyle : {
            position: "absolute",
            top: 5,
            left: 5,
        },
    });
    // --------------------------------------------------------------------------------
    let pic = null;
    let name = "";

    if (isUser){
        pic = profilePics[state?.profilePic];
        name = state?.userName;
    }
    else if (isCurPartner) {
        pic = profilePics[state?.partnerData?.profilePic];
        name = state?.partnerData?.userName;
    }
    else if (isFriendInList){
        pic = profilePics[state.profilePic];
        name = state.userName;
    }
    // --------------------------------------------------------------------------------
    return (
        <View style={styles.profileContainer}>
            {!state.partnerData && !isFriendInList && !isUser? 
                <View style={styles.pickAPartnerbox}>
                    <View style={styles.bgPattern}>
                        <TruchetPattern
                            width={200} 
                            height={200} 
                            color="#10d7f5" 
                            backgroundColor="#191818" 
                            opacity={0.5}
                        />
                    </View>
                    <AddUserIcon size={48} color="white"/>
                    <Text style={styles.pickAPartnerText}>
                        Pick a Partner!
                    </Text>
                </View>
            :
                <>
                    <Image
                        source={pic}
                        width={100}
                        height={100}
                        style={styles.photo}
                    />
                    {isUser ? <SettingsButton styles={styles}/>: null}
                    <Text style={styles.userName}>
                        {name}
                    </Text>
                </>
            }
        </View>
    );
}
// --------------------------------------------------------------------------------
export default UserProfileBox;
// --------------------------------------------------------------------------------
