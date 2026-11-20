import { StyleSheet } from 'react-native';
import { useReducer, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from 'expo-font';
import { reducer, stateShape } from './helpers/reducer';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './helpers/firebaseConfig';
import HeaderComponent from './components/main/HeaderComponent';
import { getUserData, getFriendsData, resetMyPartner } from './helpers/firebaseDatabase';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreenComponent from './components/loginComponents/LoginScreenComponent';
import MatchFx from './components/matchComponents/MatchFx';
import BottomNavigation from './components/main/BottomNavigation';
import { onSnapshot, doc } from "firebase/firestore";
import { db } from './helpers/firebaseConfig';
import { checkForMutualPartner } from './helpers/checkForMutualPartner';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// --------------------------------------------------------------------------------
// TO DO 
// 3-  make indicator for solo swiping 
// 5 - undo swipe button (remove from database likes, should be easy just always track last card swiped)
// 6 - share option. like you're swiping solo but want to share a restaurant with someone
// --------------------------------------------------------------------------------
const RootStack = createNativeStackNavigator();
// --------------------------------------------------------------------------------
export default function App() {
  // run this to delete any local data during testing
  // AsyncStorage.removeItem("hasAccount");
  const [state, dispatch] = useReducer(reducer, stateShape);

  // ------------------------------------------------------------------------------
  // useEffect Stuff and other hooks
  // ------------------------------------------------------------------------------

  // just state debugging here
  useEffect(()=>{
    // console.log("am i matched? : ", partnered());
    // console.log(state.partnerData);
    // console.log(state.friendsData);
  }, [state]);  

  // ----------------------------------------------------------------------------
  // local solution to seeing if a user has an account already 
  // so we dont show create account on start up unecessarily
  // ----------------------------------------------------------------------------
  useEffect(() => {
      const checkAccount = async () => {
          const result = await AsyncStorage.getItem("hasAccount");
          dispatch({type:"SET_HAS_ACCOUNT", hasAccount: result});
      };
      checkAccount();
      return checkAccount;
  }, []);

    // ----------------------------------------------------------------------------
    // listen to our own list of ppl wanting to be our parnters
    // ----------------------------------------------------------------------------
    useEffect(() => {
        if(!state.uid) return;
        const unsubscribe = onSnapshot(
            doc(db, "users", state.uid),
            (snapshot) => {
              checkForMutualPartner(snapshot, state, dispatch);
            }
        );
        return unsubscribe;
    }, [state.partnerData?.uid]);

  // ------------------------------------------------------------------------------
  useEffect(()=>{
    // listen for changes in the user's authentication state
    // returns a function that stops that listener automatically
    // when this component unmounts (though at app level not likely)
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user){
        // simple resets
        await resetMyPartner(user.uid);
        // set state to logged in
        dispatch({type: "LOGGED_IN", uid: user.uid});
        // get user data from firestore
        const userData = await getUserData(user.uid);
        // set data locally
        dispatch({
          type: "SET_USER_DATA", 
          userData: userData,
        })
        // get user's friends data from firestore
        const friendsData = await getFriendsData(userData);
        // set friend data locally
        dispatch({type: "SET_FRIENDS_DATA", friendsData: friendsData});
        // will this have the friends data?
      } else {
        console.log("user logged out: ");
        dispatch({type : "LOGGED_OUT"});
      }
    })
    return unsubscribe;
  }, []);

  // ------------------------------------------------------------------------------
  const [fontsLoaded] = useFonts({
    'NotoCustom': require('./assets/fonts/NotoSerif-VariableFont_wdth,wght.ttf'),
    'UnicaCustom': require('./assets/fonts/UnicaOne-Regular.ttf'),
    'QuickSandCustom':require('./assets/fonts/Quicksand-VariableFont_wght.ttf'),
    'OpenCustom':require('./assets/fonts/OpenSans-VariableFont_wdth,wght.ttf'),
  });
  if (!fontsLoaded || !state.authChecked) {
    return null;
  }
  // ------------------------------------------------------------------------------
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: state.mainAppBgColor,
      position: "relative",
    },
    isoSphere :{
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: -1,
    }
  });
  const navTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: state.mainAppBgColor,
    },
  };
  // ------------------------------------------------------------------------------
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView 
          style={styles.container} 
          edges={["top"]}
        >
          <HeaderComponent state={state}/>

          {state.loggedIn && state.matchMade ?
            <MatchFx
              state={state}
              dispatch={dispatch}
            /> :
            null
          }

          <NavigationContainer theme={navTheme}>
            <RootStack.Navigator
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: state.mainAppBgColor },
              }}
            >
              {state.loggedIn ? (
                <RootStack.Screen name="Main">
                  {() => <BottomNavigation state={state} dispatch={dispatch}/>}
                </RootStack.Screen>
              ) : (
                <RootStack.Screen
                  name="Login"
                  options={{ animationTypeForReplace: "pop" }}
                >
                  {() => <LoginScreenComponent dispatch={dispatch}/>}
                </RootStack.Screen>
              )}
            </RootStack.Navigator>
          </NavigationContainer>

        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
// ------------------------------------------------------------------------------
