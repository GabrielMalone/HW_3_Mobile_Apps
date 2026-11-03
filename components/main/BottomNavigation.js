import { View, Text, StyleSheet, Pressable } from "react-native";
import ResetIcon from "../../assets/svg/ResetIcon";
import HeartIcon from "../../assets/svg/HeartIcon";
import HomeIcon from "../../assets/svg/HomeIcon";
import GlobeSearchIcon from "../../assets/svg/GlobeSeachIcon";
import SettingsIcon from "../../assets/svg/SettingsIcon";
import { clearLikesAndDislikes } from "../../helpers/firebaseDatabase";
import { useEffect, useState } from "react";

// --------------------------------------------------------------------------------

const buttonColor = "dimgray";

// --------------------------------------------------------------------------------
const ResetButton = ({styles, state, dispatch}) => {
    return (
        <Pressable 
            style={styles.buttonStyle}
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
                        <ResetIcon 
                            color={pressed ? "lightgreen" : buttonColor} 
                            size={28}
                        />
                        <Text 
                            style={styles.buttonText}>
                                reset  
                        </Text>
                        </>
                    );
                }
            }
        </Pressable>  
    );
}
// --------------------------------------------------------------------------------
const FavoritesButton = ({styles, color, dispatch}) => {

    return (
        <Pressable
            style={styles.buttonStyle}
            onPress={()=>dispatch({type: "TOGGLE_USER_FAVORITES"})}
        >
            {
                ({pressed})=>{
                    return (
                        <>
                        <HeartIcon 
                            color={color} 
                            size={28}
                        />
                        <Text 
                            style={styles.buttonText}>
                                favorites  
                        </Text>
                        </>
                    );
                }
            }
        </Pressable>
    );
}
// --------------------------------------------------------------------------------
const HomeButton = ({styles}) => {
    return (
        <Pressable
            style={styles.buttonText}
        >
            {
                ({pressed})=>{
                    return (
                        <>
                        <HomeIcon 
                            color={pressed ? "lightgreen" : buttonColor} 
                            size={28}
                        />
                        <Text 
                            style={styles.buttonText}>
                                home  
                        </Text>
                        </>
                    );
                }
            }
        </Pressable>
    );
}
// --------------------------------------------------------------------------------
const SearchSettingsButton = ({styles}) => {
    return (
        <Pressable
            style={styles.buttonStyle}
        >
            {
                ({pressed})=>{
                    return (
                        <>
                        <GlobeSearchIcon 
                            color={pressed ? "lightgreen" : buttonColor} 
                            size={28}
                        />
                        <Text 
                            style={styles.buttonText}>
                                radius
                        </Text>
                        </>
                    );
                }
            }
        </Pressable>
    ); 
}
// --------------------------------------------------------------------------------
const SettingsButton = ({dispatch, styles}) => {
    return (
        <Pressable
            style={styles.buttonStyle}
            onPress={()=>{
                dispatch({type: "LOGGED_OUT"});
            }}
        >
            {
                ({pressed})=>{
                    return (
                        <>
                        <SettingsIcon 
                            color={pressed ? "lightgreen" : buttonColor} 
                            size={28}
                        />
                        <Text 
                            style={styles.buttonText}>
                                logout
                        </Text>
                        </>
                    );
                }
            }
        </Pressable>
    ); 
}
// --------------------------------------------------------------------------------
const BottomNavigation = ({state, dispatch}) => {

    const [activeColor, setActiveColor] = useState(buttonColor);

    useEffect(()=>{
        // console.log("likes updated!")
        setActiveColor("lightgreen");
        setTimeout(() => {
            setActiveColor("darkgrey");
        }, 200);
    },
    [state?.liked]);

    const styles = StyleSheet.create({

        tabContainer : {

            minHeight: 50,
            maxHeight :50,
            width: "100%",
            backgroundColor: "#ffffff00",
            borderColor: "#343734",
            borderTopWidth: 1,
            alignSelf: "center",
            marginTop: 10,
            paddingTop: 30,
            gap: 20,

            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"

        },

        buttonStyle : {
            alignItems: "center",
        },

        buttonText : {
            color : "#FFFFFF",
            fontSize:  10,      
        },

    });

    return (
        <View 
            style={styles.tabContainer}
        >
            <SettingsButton 
                styles={styles}
                dispatch={dispatch}
            />
            <HomeButton 
                styles={styles}
            />
            <FavoritesButton 
                styles={styles}
                dispatch={dispatch}
                color={activeColor}
            />
            <ResetButton 
                styles={styles} 
                state={state} 
                dispatch={dispatch}
            />
            <SearchSettingsButton 
                styles={styles}
            />
        </View>
    );

}
// --------------------------------------------------------------------------------
export default BottomNavigation;


