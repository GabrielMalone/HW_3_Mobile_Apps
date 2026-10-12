import { StyleSheet, View, Image } from "react-native";
// --------------------------------------------------------------------------------
// This box is the smallest unit that contains the user profile image
// --------------------------------------------------------------------------------
const UserProfileBox = ({profileData, state}) => {

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

    return (
        <View style={sytles.profileContainer}>
                <Image
                    source={profileData.profilePic}
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
