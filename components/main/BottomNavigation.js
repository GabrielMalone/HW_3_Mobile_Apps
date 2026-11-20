import { useEffect, useState } from "react";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";
import HeartIcon from "../../assets/svg/HeartIcon";
import HomeIcon from "../../assets/svg/HomeIcon";
import SettingsIcon from "../../assets/svg/SettingsIcon";
import ProfileArea from "../userComponents/ProfileArea";
import PlaceholderDeck from "../decks/PlaceholderDeck";
import RestaurantDeck from "../decks/RestaurantDeck";
import UserFavoritesComponent from "../userComponents/UserFavoritesComponent";
import UserSettingsComponent from "../userComponents/UserSettingsComponent";
// --------------------------------------------------------------------------------
const Tab = createBottomTabNavigator();

const buttonColor = "dimgray";
const activeButtonColor = "lightgreen";
const iconSize = 28;

// --------------------------------------------------------------------------------
const BottomNavigation = ({state, dispatch}) => {

    const [favoritesFlash, setFavoritesFlash] = useState(false);

    useEffect(()=>{
        setFavoritesFlash(true);
        const timeout = setTimeout(() => {
            setFavoritesFlash(false);
        }, 200);
        return () => clearTimeout(timeout);
    },
    [state?.liked]);

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: activeButtonColor,
                tabBarInactiveTintColor: buttonColor,
                tabBarLabelStyle: { fontSize: 10 },
                tabBarStyle: {
                    backgroundColor: state.mainAppBgColor,
                    borderTopColor: "#343734",
                    borderTopWidth: 1,
                    elevation: 0,
                },
            }}
            screenListeners={{
                focus: () => dispatch({type: "HIDE_FRIENDS_LIST"}),
            }}
            tabBar={(props) => {
                const activeRoute = props.state.routes[props.state.index].name;
                return (
                    <>
                        <ProfileArea
                            state={state}
                            dispatch={dispatch}
                            navigation={props.navigation}
                            activeRoute={activeRoute}
                        />
                        <BottomTabBar {...props}/>
                    </>
                );
            }}
        >
            <Tab.Screen
                name="Home"
                options={{
                    tabBarLabel: "home",
                    tabBarIcon: ({color}) => <HomeIcon color={color} size={iconSize}/>,
                }}
            >
                {() => (
                    !state.partnerData && !state.swipingSolo ?
                        <PlaceholderDeck state={state} dispatch={dispatch}/> :
                        <RestaurantDeck
                            key={`${state.listReset}-${state.searchRadius}`}
                            dispatch={dispatch}
                            state={state}
                        />
                )}
            </Tab.Screen>
            <Tab.Screen
                name="Favorites"
                options={{
                    tabBarLabel: "favorites",
                    tabBarIcon: ({color}) => (
                        <HeartIcon
                            color={favoritesFlash ? activeButtonColor : color}
                            size={iconSize}
                        />
                    ),
                }}
            >
                {() => <UserFavoritesComponent state={state} dispatch={dispatch}/>}
            </Tab.Screen>
            <Tab.Screen
                name="Settings"
                options={{
                    tabBarLabel: "settings",
                    tabBarIcon: ({color}) => <SettingsIcon color={color} size={iconSize}/>,
                }}
            >
                {() => <UserSettingsComponent state={state} dispatch={dispatch}/>}
            </Tab.Screen>
        </Tab.Navigator>
    );

}
// --------------------------------------------------------------------------------
export default BottomNavigation;
