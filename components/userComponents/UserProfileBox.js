import { StyleSheet, View, Image, Text } from "react-native";
import { profilePics } from "../../data/mockUsers";
import AddUserIcon from "../../assets/svg/AddUserIcon";
import TruchetPattern from "../../assets/svg/TruchetPattern.jsx";
// --------------------------------------------------------------------------------
// This box is the smallest unit that contains the user profile image
// --------------------------------------------------------------------------------
const UserProfileBox = ({state, isUser=false, isCurPartner=false, isFriendInList=false}) => {

    const sytles = StyleSheet.create({
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
        <View style={sytles.profileContainer}>
            {!state.partnerData && !isFriendInList && !isUser? 
                <View style={sytles.pickAPartnerbox}>
                    <View style={sytles.bgPattern}>
                        <TruchetPattern
                            width={200} 
                            height={200} 
                            color="#f510bc" 
                            backgroundColor="#191818" 
                            opacity={100}
                        />
                    </View>
                    <AddUserIcon size={48} color="white"/>
                    <Text style={sytles.pickAPartnerText}>
                        Pick a Partner!
                    </Text>
                </View>
            :
                <>
                    <Image
                        source={pic}
                        width={100}
                        height={100}
                        style={sytles.photo}
                    />
                    <Text style={sytles.userName}>
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
