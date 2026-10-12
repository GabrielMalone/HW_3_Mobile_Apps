import { useEffect, useState } from 'react';
import {
    createSwipeDeck,
    SwipeDeckMotion
} from "@react-native-motion-kit/swipe-deck";
import getRestaurantData from '../../helpers/getRestaurantData';
import Card from '../cardComponents/Card'

// --------------------------------------------------------------------------------
// https://react-native-swipe-deck.pages.dev
// --------------------------------------------------------------------------------
const RestaurantCards = createSwipeDeck({
    motion: SwipeDeckMotion.tinder(),
});

// --------------------------------------------------------------------------------
// https://react-native-swipe-deck.pages.dev/guide/usage/handling-events
// --------------------------------------------------------------------------------
function DeckEvents(dispatch) {

  RestaurantCards.useDeckEventListener('swipe', ({ item, direction, source }) => {

    switch(direction)
    {
      case "left" :  return dispatch({type: "DISLIKED", placeId: item.id});
      case "right":  return dispatch({type: "LIKED", placeId: item.id});
      default : return;
    }
  });

  RestaurantCards.useDeckEventListener('undo', ({ item }) => {
    console.log('Restored', item);
  });

  RestaurantCards.useDeckEventListener('endReached', () => {
    console.log('No more cards');
  });

  return null;
}
// --------------------------------------------------------------------------------
export default function RestaurantDeck({dispatch, state}) {
// --------------------------------------------------------------------------------
  const [restaurantData, setRestaurantData] = useState([]);

  DeckEvents(dispatch);

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
  return (
    <RestaurantCards.Root
      data={restaurantData}
      getKey={(restaurant) => restaurant.id}
      allowedDirections={["left", "right"]}
      visibleCardCount={3}
    >
      <RestaurantCards.Card interactive>
        {({ item }) => <Card data={item} state={state}/>}
      </RestaurantCards.Card>
    </RestaurantCards.Root>
  );
}
// ------------------------------------------------------------------------------
