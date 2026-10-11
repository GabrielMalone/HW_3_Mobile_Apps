import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
    createSwipeDeck,
    SwipeDeckMotion
} from "@react-native-motion-kit/swipe-deck";
import { useFonts } from 'expo-font';
import getRestaurantData from './getRestaurantData';
import Card from './Card';
// --------------------------------------------------------------------------------
const RestaurantCards = createSwipeDeck({
    motion: SwipeDeckMotion.tinder(),
});
// --------------------------------------------------------------------------------
export default function RestaurantDeck() {
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
    <RestaurantCards.Root
        data={restaurantData}
        getKey={(restaurant) => restaurant.id}
        allowedDirections={["left", "right"]}
        visibleCardCount={3}
    >
        <RestaurantCards.Card interactive>
        {({ item }) => 
            <Card 
            data={item}
            />
        }
        </RestaurantCards.Card>
    </RestaurantCards.Root>
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
