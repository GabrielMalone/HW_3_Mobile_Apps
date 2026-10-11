import { StyleSheet } from 'react-native';
import {
    SafeAreaProvider,
    SafeAreaView
} from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RestaurantDeck from './RestaurantDeck';
import ProfileArea from './ProfileArea';
import HeaderComponent from './HeaderComponent';
// --------------------------------------------------------------------------------
export default function App() {
  // ------------------------------------------------------------------------------
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
