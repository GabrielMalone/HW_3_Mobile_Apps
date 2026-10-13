import { StyleSheet } from 'react-native';
import { useReducer, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from 'expo-font';
import { reducer, stateShape } from './helpers/reducer';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './helpers/firebaseConfig';
import RestaurantDeck from './components/decks/RestaurantDeck';
import ProfileArea from './components/userComponents/ProfileArea';
import HeaderComponent from './components/main/HeaderComponent';
import UserSettingsComponent from './components/userComponents/userSettings/UserSettingsComponent';
import { getUserData, getFriendsData } from './helpers/firebaseDatabase';
import CreateAccountComponent from './components/loginComponents/CreateAccountComponent';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreenComponent from './components/loginComponents/LoginScreenComponent';
// --------------------------------------------------------------------------------
export default function App() {
  // run this to delete any local data during testing
  // AsyncStorage.removeItem("hasAccount");
  // TO DO --
  // method to retrieve all friends (seed friends in user 1)
  // friends list loads entire user object not just profile pic 
  const [state, dispatch] = useReducer(reducer, stateShape);
  // ------------------------------------------------------------------------------
  // useEffect Stuff and other hooks
  // ------------------------------------------------------------------------------
  // for debuggins stsate
  useEffect(() => {
      console.log(JSON.stringify(state, null, 2));
  }, [state]);
  // local solution to seeing if a user has an account already 
  // so we dont show create account on start up unecessarily
  useEffect(() => {
      const checkAccount = async () => {
          const result = await AsyncStorage.getItem("hasAccount");
          dispatch({type:"SET_HAS_ACCOUNT", hasAccount: result});
      };
      checkAccount();
  }, []);
  useEffect(()=>{
    // listen for changes in the user's authentication state
    // returns a function that stops that listener automatically
    // when this component unmounts (though at app level not likely)
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user){
        dispatch({type: "LOGGED_IN", uid: user.uid});
        const userData = await getUserData(user.uid);
        dispatch({
          type: "SET_USER_DATA", 
          curUser: userData.curUser, 
          friends: userData.friends
        })
        const friendsData = await getFriendsData(state);
        dispatch({type: "SET_FRIENDS_DATA", friendsData: friendsData});
      } else {
        console.log("user logged out: ");
        dispatch({type : "LOGGED_OUT"});
      }
    })
    return unsubscribe;
  }, []);
  // hook to load custom fonts
  const [fontsLoaded] = useFonts({
    'NotoCustom': require('./assets/fonts/NotoSerif-VariableFont_wdth,wght.ttf'),
    'UnicaCustom': require('./assets/fonts/UnicaOne-Regular.ttf'),
    'QuickSandCustom':require('./assets/fonts/Quicksand-VariableFont_wght.ttf'),
    'OpenCustom':require('./assets/fonts/OpenSans-VariableFont_wdth,wght.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  // ------------------------------------------------------------------------------
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: state.mainAppBgColor,
      position: "relative",
    },
  });
  // ------------------------------------------------------------------------------
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView 
          style={styles.container} 
          edges={["top", "bottom"]}
        >
          <HeaderComponent state={state}/>

          {!state.loggedIn && !state.hasAccount?
            <CreateAccountComponent 
              dispatch={dispatch}
            /> :
            null
          }

          {!state.loggedIn && state.hasAccount?
            <LoginScreenComponent 
              dispatch={dispatch}
            /> :
            null
          }

          {state.userSettingsVisible ?
            <UserSettingsComponent
              state={state} 
              dispatch={dispatch}
            /> :
            null
          }
          
          <RestaurantDeck 
            dispatch={dispatch} 
            state={state}           
          />

          <ProfileArea 
            state={state}
            dispatch={dispatch}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
// ------------------------------------------------------------------------------
