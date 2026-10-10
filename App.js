import { useRef } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { Card } from './Card';
import { useFonts } from 'expo-font';
import GetRestaurantData from './GetRestaurantData';

// 1. Sample Data
const CARDS = [
  { id: 1, text: 'Local Restaurant' },
  { id: 2, text: 'Card Two' },
  { id: 3, text: 'Card Three' },
];

export default function App() {
  // this will let us get access to the methods inside of the Swiper 
  // and we can call them on the specific isntance of the swiper
  // we create (for buttons that do it auto)
  const swiperRef = useRef(null);
  const [fontsLoaded] = useFonts({
    'NotoCustom': require('./assets/fonts/NotoSerif-VariableFont_wdth,wght.ttf'),
    'UnicaCustom': require('./assets/fonts/UnicaOne-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  
  // should return an array
  const data = GetRestaurantData();

  return (
    <View style={styles.container}>
      {/* 3. The Swiper Component */}
      <Swiper
        ref={swiperRef}
        cards={CARDS}
        renderCard={Card}
        onSwipedLeft={(index) => console.log('Swiped left on index:', index)}
        onSwipedRight={(index) => console.log('Swiped right on index:', index)}
        onSwipedAll={() => console.log('All cards swiped!')}
        cardIndex={0}
        backgroundColor={'transparent'}
        stackSize={3} // Number of cards visible in the stack background
      />

      {/* Optional: Programmatic trigger buttons */}
      <View style={styles.buttonContainer}>
        {/* <Button title="Swipe Left" onPress={() => swiperRef.current.swipeLeft()} />
        <Button title="Swipe Right" onPress={() => swiperRef.current.swipeRight()} /> */}
      </View>
    </View>
  );

}

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
