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
import UserSettingsComponent from './components/userComponents/UserSettingsComponent';
import { getUserData, getFriendsData, resetMyPartner, removeMeFromOtherLists } from './helpers/firebaseDatabase';
import CreateAccountComponent from './components/loginComponents/CreateAccountComponent';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreenComponent from './components/loginComponents/LoginScreenComponent';
import MatchFx from './components/matchComponents/MatchFx';
import PlaceholderDeck from './components/decks/PlaceholderDeck';
import BottomNavigation from './components/main/BottomNavigation';
import UserFavoritesComponent from './components/userComponents/UserFavoritesComponent';
import { onSnapshot, doc } from "firebase/firestore";
import { db } from './helpers/firebaseConfig';
import { checkForMutualPartner } from './helpers/checkForMutualPartner';
import IsoSphere from './assets/svg/IsoSphere';
// --------------------------------------------------------------------------------
// TO DO 
// 1 - set up partner matching awareness. list of people who have me as their selected partner. 
// 2 - make both parties aware when parnter matched (could like golden both avatars or someething)
// 2a - if I pick a partner and they have not yet selected me as a partner, indicate that as well (maybe like a greyed out avatar or red outline or something)
// 3 - otherwise make indicator for solo swiping 
// 4 - set up favorites page for solo swipes and partner swipes. (maybe array of mini cards showing your likes)
// 5 - undo swipe button (remove from database likes, should be easy just always track last card swiped)
// 6 - share option. like you're swiping solo but want to share a restaurant with someone
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
    isoSphere :{
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: -1,
    }
  });
  // ------------------------------------------------------------------------------
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView 
          style={styles.container} 
          edges={["top", "bottom"]}
        >
          {/* <IsoSphere
              style={styles.isoSphere}
              width={state.loggedIn? 500 : 1200}
              height={state.loggedIn? 700 : 1000}
              lightColor = {state.loggedIn? "#b700ff0c": "#ff00f71b"}
              darkColor = {state.loggedIn? "#3e800000" : "#01031325"}
          /> */}
          <HeaderComponent state={state}/>

          {state.matchMade ? 
            <MatchFx 
              state={state}
              dispatch={dispatch} 
            /> : 
            null
          }

          {/* {!state.loggedIn && !state.hasAccount?
            <CreateAccountComponent 
              dispatch={dispatch}
            /> :
            null
          } */}

          {!state.loggedIn ?
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

          {state.userFavoritesVisible ?
            <UserFavoritesComponent
              state={state} 
              dispatch={dispatch}
            /> :
            null
          }
          
          {!state.partnerData && !state.swipingSolo ? 
            
            <PlaceholderDeck state={state} dispatch={dispatch}/> :

            <RestaurantDeck 
              key={state.listReset}
              dispatch={dispatch} 
              state={state}           
            />

          }

          <ProfileArea 
            state={state}
            dispatch={dispatch}
          />

          <BottomNavigation 
            state={state} 
            dispatch={dispatch}
          />
          
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
// ------------------------------------------------------------------------------
