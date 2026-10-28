import { View, Text, StyleSheet, Pressable } from "react-native";
import ResetIcon from "../../assets/svg/ResetIcon";
import HeartIcon from "../../assets/svg/HeartIcon";
import HomeIcon from "../../assets/svg/HomeIcon";
import GlobeSearchIcon from "../../assets/svg/GlobeSeachIcon";
import { clearLikesAndDislikes } from "../../helpers/firebaseDatabase";
// --------------------------------------------------------------------------------
const ResetButton = ({styles, state, dispatch}) => {
    return (
        <Pressable 
            style={styles.ResetButtonStyle}
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
                            color={pressed ? "lime" : "white"} 
                            size={28}
                        />
                        <Text 
                            style={styles.ResetButtonStyleText}>
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
const FavoritesButton = ({styles}) => {
    return (
        <Pressable
            style={styles.FavoritesButtonStyle}
        >
            {
                ({pressed})=>{
                    return (
                        <>
                        <HeartIcon 
                            color={pressed ? "pink" : "white"} 
                            size={28}
                        />
                        <Text 
                            style={styles.FavoritesButtonStyleText}>
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
            style={styles.HomeButtonStyle}
        >
            {
                ({pressed})=>{
                    return (
                        <>
                        <HomeIcon 
                            color={pressed ? "yellow" : "white"} 
                            size={28}
                        />
                        <Text 
                            style={styles.HomeButtonStyleText}>
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
            style={styles.HomeButtonStyle}
        >
            {
                ({pressed})=>{
                    return (
                        <>
                        <GlobeSearchIcon 
                            color={pressed ? "blue" : "white"} 
                            size={28}
                        />
                        <Text 
                            style={styles.HomeButtonStyleText}>
                                location  
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

    const styles = StyleSheet.create({

        tabContainer : {

            minHeight: 50,
            maxHeight :50,
            width: "80%",
            backgroundColor: "#121212",
            borderColor: "#343734",
            borderWidth : 1,
            borderRadius : 10,
            alignSelf: "center",
            marginTop: 10,

            gap: 20,

            flexDirection: "row",
            justifyContent: "center",

        },

        HomeButtonStyle : {
            alignItems: "center",
        },

        HomeButtonStyleText : {
            color : "#FFFFFF",
            fontSize:  10,      
        },

        ResetButtonStyle : {
            alignItems: "center",
        },

        FavoritesButtonStyle : {
            alignItems : "center"
        },

        ResetButtonStyleText : {
            color : "#FFFFFF",
            fontSize:  10,      
        },

        FavoritesButtonStyleText : {
            color : "#FFFFFF",
            fontSize:  10,
        },

    });

    return (
        <View style={styles.tabContainer}>
            <HomeButton 
                styles={styles}
            />
            <FavoritesButton styles={styles}/>
            <ResetButton 
                styles={styles} 
                state={state} 
                dispatch={dispatch}
            />
            <SearchSettingsButton styles={styles}/>
        </View>
    );

}
// --------------------------------------------------------------------------------
export default BottomNavigation;


