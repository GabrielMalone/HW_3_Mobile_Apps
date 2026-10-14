import { useEffect, useState } from 'react';
import {
    createSwipeDeck,
    SwipeDeckMotion
} from "@react-native-motion-kit/swipe-deck";
import getRestaurantData from '../../helpers/getRestaurantData';
import Card from '../cardComponents/Card'
import { compareLikes } from '../../helpers/compareLikes';
import { setUserLikes, setUserDislikes, getUserData } from '../../helpers/firebaseDatabase';

// --------------------------------------------------------------------------------
// https://react-native-swipe-deck.pages.dev
// --------------------------------------------------------------------------------
const RestaurantCards = createSwipeDeck({
    motion: SwipeDeckMotion.tinder(),
});

// --------------------------------------------------------------------------------
// https://react-native-swipe-deck.pages.dev/guide/usage/handling-events
// --------------------------------------------------------------------------------
async function DeckEvents(dispatch, state) {

  RestaurantCards.useDeckEventListener('swipe', async ({ item, direction, source }) => {
    
    switch(direction)
    {
      case "left" :  
        dispatch({type: "DISLIKED", placeId: item.id});
        await setUserDislikes(state.uid, item.id);
        return;

      case "right": 
        // what's the best way to go about this?
        // update the backend then have that auto update the state?
        dispatch({type: "LIKED", placeId: item.id});
        try {
          // i need to try catch my asyn stuff more
          await setUserLikes(state.uid, item.id);
        } catch (error) {
            console.log("Error saving like:", error);
        }
        if (!state.partnerData) return;
        // need to change this to a remote check
        const isMatch = compareLikes(item.id, state.partnerData?.liked);
        if (isMatch){
          dispatch({type: "SET_MATCH_MADE", isMatch: true});
        }

      default : 
        return;
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

  DeckEvents(dispatch, state);

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
