import { View, StyleSheet, TextInput, Text } from "react-native";
import { useState } from "react";
import HalftoneSphere from "../../assets/svg/HalftoneSphere";
import SubmitButton from "../../assets/svg/SubmitButton";
import registerUser from "../../helpers/firebaseAuth";
// ------------------------------------------------------------------------------
const LoginScreen = ({dispatch}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitButtonColor, setSubmitButtonColor] = useState("#FFFFFF");

    const handleSubmit = async (dispatch) => {
        setSubmitButtonColor("#00ddff");
        try {
            const user = await registerUser(email, password);
            console.log(`user: ${JSON.stringify(user)}`)
        } catch (error) {
            console.error("Firebase registration error:", error.code, error.message);
            setSubmitButtonColor("#FFFFFF");           
        }
    }

    return (
        <View style={styles.loginScreenContainer}>

            <HalftoneSphere 
                width={600}
                height={600}
                color="#00ffae"
                opacity={0.1}
                style={{zIndex: 0, position: "absolute"}}
            />

            <Text style={styles.loginHeader}>
                Create Account
            </Text>

            <TextInput
                style={styles.inputStyle}
                placeholderTextColor={"#FFFFFF"}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                placeholderTextColor={"#FFFFFF"}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                secureTextEntry={true}
            /> 

            <SubmitButton 
                onPress={  ()=>{handleSubmit(dispatch)} }
                color={submitButtonColor}
                width={50}
                height={50}
            />

        </View>
    );
}
// ------------------------------------------------------------------------------
const styles = StyleSheet.create({

    loginScreenContainer : {

        width: "100%",
        height: "95%",

        // backgroundColor: "#0f0f0f",
        borderRadius: 20,
        zIndex: 1,

        marginHorizontal: 20,
        marginBottom: 100,

        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",

        position: "relative",
    },

    loginHeader : {
        fontFamily: "OpenCustom",
        fontSize: 32,
        color: "white",
    },

    inputStyle : {

        borderWidth: 1,
        borderColor: "#b7b6b6",
        borderRadius: 10,
        backgroundColor:"#000000",

        width: "80%",
        height: 50,

        marginVertical: 25,
        padding: 5,

        fontFamily: "OpenCustom",
        fontSize: 18,
        color: "white",

    }



});
// ------------------------------------------------------------------------------
export default LoginScreen