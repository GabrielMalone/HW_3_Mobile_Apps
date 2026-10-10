import { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

import {
    createSwipeDeck,
    SwipeDeckMotion
} from "@react-native-motion-kit/swipe-deck";

import {
    SafeAreaProvider,
    SafeAreaView
} from "react-native-safe-area-context";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from 'expo-font';

import getRestaurantData from './getRestaurantData';
import Card from './Card';
// --------------------------------------------------------------------------------
const RestaurantDeck = createSwipeDeck({
    motion: SwipeDeckMotion.tinder(),
});
// --------------------------------------------------------------------------------
export default function App() {
// --------------------------------------------------------------------------------
  const [restaurantData, setRestaurantData] = useState([]);
  // ------------------------------------------------------------------------------
  // need useState for the re-render, 
  // and useEffect to prevent the API request from running on every render.
  // otherwise infinite loop
  // ------------------------------------------------------------------------------
  useEffect(()=>{
      const loadRestaurants = async () => {
          const places = await getRestaurantData();
          setRestaurantData(places);
      }
      loadRestaurants();
  },[]);
  // ------------------------------------------------------------------------------
  // load custom fonts
  // ------------------------------------------------------------------------------
  const [fontsLoaded] = useFonts({
    'NotoCustom': require('./assets/fonts/NotoSerif-VariableFont_wdth,wght.ttf'),
    'UnicaCustom': require('./assets/fonts/UnicaOne-Regular.ttf'),
    'QuickSandCustom':require('./assets/fonts/Quicksand-VariableFont_wght.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  // ------------------------------------------------------------------------------

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={["top", "bottom"]}>

            <RestaurantDeck.Root
              data={restaurantData}
              getKey={(restaurant) => restaurant.id}
              allowedDirections={["left", "right"]}
              visibleCardCount={3}
            >
              <RestaurantDeck.Card>
                {({ item }) => 
                  <Card 
                    data={item}
                  />
                }
              </RestaurantDeck.Card>
            </RestaurantDeck.Root>
            
        </SafeAreaView>
      </SafeAreaProvider>

    </GestureHandlerRootView>
  );
}
// ------------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1B1B",
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});
