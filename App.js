import { StyleSheet } from 'react-native';
import {
    SafeAreaProvider,
    SafeAreaView
} from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RestaurantDeck from './RestaurantDeck';
import ProfileArea from './components/userComponents/ProfileArea';
import HeaderComponent from './HeaderComponent';
// --------------------------------------------------------------------------------
export default function App() {
  // ------------------------------------------------------------------------------

  // TODO -->
  // make a reducer to manage state:
    // want to manage current partner object (and like all the data related to the current Partner) for matching 
    // current user object (and all the data related to the current user)
    // maybe cards seen this session
    // friendListState component on off
    // userProfileSetting State on off
    // search radius settings
    // reset search settings
    // category settings of search
    // location search settings
  // manage colors in some central location


  return (
    <GestureHandlerRootView 
      style={{ flex: 1 }}
    >
      <SafeAreaProvider>
        <SafeAreaView 
          style={styles.container} 
          edges={["top", "bottom"]}
        >
        <HeaderComponent />
        <RestaurantDeck />
        <ProfileArea />
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
