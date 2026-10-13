import { StyleSheet, View, Image } from "react-native";
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
        },
        photo:{
            width: 100,
            height: 100,
            borderRadius: 10,
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.65)",
        }
    });
    // --------------------------------------------------------------------------------
    let pic = null;
    if (isUser){
        pic = profilePics[state?.curUser?.profilePic];
    }
    else if (isCurPartner) {
        pic = profilePics[state?.curPartner?.curUser?.profilePic];
    }
    else if (isFriendInList){
        pic = profilePics[state.profilePic];
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
        </View>
    );
}
// --------------------------------------------------------------------------------
export default UserProfileBox;
// --------------------------------------------------------------------------------
