import { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import GetRestaurantData from './GetRestaurantData';
import Card from './Card';
import { useFonts } from 'expo-font';

export default function App() {
// --------------------------------------------------------------------------------

  // useRef --> this will let us get access to the methods inside of the Swiper 
  // and we can call them on the specific isntance of the swiper
  // we create (for buttons that do it auto)

  const [restaurants, setRestaurants] = useState([]);
  const swiperRef = useRef(null);

  // ------------------------------------------------------------------------------
  // need useState for the re-render, 
  // and useEffect to prevent the API request from running on every render.
  // otherwise infinite loop
  // ------------------------------------------------------------------------------
  useEffect(()=>{
      const loadRestaurants = async () => {
          const results = await GetRestaurantData();
          setRestaurants(results);
      }
      loadRestaurants();
  },[]);
  // ------------------------------------------------------------------------------
  // load custom fonts
  // ------------------------------------------------------------------------------
  const [fontsLoaded] = useFonts({
    'NotoCustom': require('./assets/fonts/NotoSerif-VariableFont_wdth,wght.ttf'),
    'UnicaCustom': require('./assets/fonts/UnicaOne-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  // ------------------------------------------------------------------------------
  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        cards={restaurants}
        renderCard={Card}
        onSwipedLeft={(index) => console.log('Swiped left on index:', index)}
        onSwipedRight={(index) => console.log('Swiped right on index:', index)}
        onSwipedAll={() => console.log('All cards swiped!')}
        cardIndex={0}
        backgroundColor={'transparent'}
        stackSize={3} // Number of cards visible in the stack background
        stackSeparation={20}
        stackScale={10}
      />
    </View>
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
