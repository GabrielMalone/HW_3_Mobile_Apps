import { StyleSheet, View, Image } from "react-native";
// --------------------------------------------------------------------------------
const UserProfileBox = ({profilePic}) => {

    return (
        <View style={sytles.profileContainer}>
            <Image
                source={profilePic}
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
const sytles = StyleSheet.create({
    profileContainer: {
        borderRadius: 10,
        borderColor: "white",
        borderWidth: 1,
        padding: 10,
        margin: 5,
    },
    photo:{
        width: 100,
        height: 100,
        borderRadius: 10,
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.8)",
    }
});