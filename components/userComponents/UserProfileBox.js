import { StyleSheet, View, Image, Text } from "react-native";
import { profilePics } from "../../data/mockUsers";
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
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.65)"
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
        }
    });
    // --------------------------------------------------------------------------------
    let pic = null;
    let name = "";
    if (isUser){
        pic = profilePics[state?.curUser?.profilePic];
        name = state?.curUser?.userName;
    }
    else if (isCurPartner) {
        pic = profilePics[state?.curPartner?.curUser?.profilePic];
        name = state?.curPartner?.curUser?.userName;
    }
    else if (isFriendInList){
        pic = profilePics[state.profilePic];
        name = state.userName;
    }
    // --------------------------------------------------------------------------------
    return (
        <View style={sytles.profileContainer}>
            <Image
                source={pic}
                width={100}
                height={100}
                style={sytles.photo}
            />
            <Text style={sytles.userName}>
                {name}
            </Text>
        </View>
    );
}
// --------------------------------------------------------------------------------
export default UserProfileBox;
// --------------------------------------------------------------------------------
