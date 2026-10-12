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
import LoginScreen from './components/loginComponents/LoginScreen';
// --------------------------------------------------------------------------------
export default function App() {
   
  // TO DO --
  // when a user logs in, retrieve their profile from Firestore and load it into your reducer.

  const [state, dispatch] = useReducer(reducer, stateShape);

  useEffect(() => {
      console.log(JSON.stringify(state, null, 2));
  }, [state]);

  useEffect(()=>{
    // listen for changes in the user's authentication state
    // returns a function that stops that listener automatically
    // when this component unmounts (though at app level not likely)
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      if (user){
        console.log("user logged in: ", user.uid);
        dispatch({type: "LOGGED_IN", uid: user.uid});
      } else {
        console.log("user logged out: ");
        dispatch({type : "LOGGED_OUT"});
      }
    })
    return unsubscribe;
  }, []);
  
  // ------------------------------------------------------------------------------
  // load custom fonts
  // ------------------------------------------------------------------------------
  
  const [fontsLoaded] = useFonts({
    'NotoCustom': require('./assets/fonts/NotoSerif-VariableFont_wdth,wght.ttf'),
    'UnicaCustom': require('./assets/fonts/UnicaOne-Regular.ttf'),
    'QuickSandCustom':require('./assets/fonts/Quicksand-VariableFont_wght.ttf'),
    'OpenCustom':require('./assets/fonts/OpenSans-VariableFont_wdth,wght.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView 
          style={styles.container} 
          edges={["top", "bottom"]}
        >
          <HeaderComponent />

          {!state.loggedIn ?
            <LoginScreen 
              dispatch={dispatch}
            /> :
            null
          }

          <RestaurantDeck 
            dispatch={dispatch}            
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    position: "relative",
  },
});
