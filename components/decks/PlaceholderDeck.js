import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
    createSwipeDeck,
    SwipeDeckMotion
} from "@react-native-motion-kit/swipe-deck";
import TruchetPattern from "../../assets/svg/TruchetPattern.jsx";

// --------------------------------------------------------------------------------
const placeholderCards = createSwipeDeck({
      motion: SwipeDeckMotion.tinder(),
});
// --------------------------------------------------------------------------------
function PlaceholderDeck({dispatch, state}) {

  // instruction cards before partner is picked
  const cards = [
    {text: "please pick a partner...", id: 0},
    {text: "once you have a partner...", id: 1},
    {text: "that same partner needs to select you as their partner...", id: 2},
    {text: "then you can both start swiping!", id: 3},
    {text: "swipe left to say NO to a restaurant", id: 4},
    {text: "swipe right to say YES to a restaurant", id: 5},
    {text: "if you both swipe right, we'll let you know!", id: 6},
  ];

  // ------------------------------------------------------------------------------
  const styles = StyleSheet.create({

    placeHolderCard:{

      flex: 1,
      alignSelf: "center",
      backgroundColor: "#000000",
      
      width: "90%",
      height: "90%",
      
      borderWidth:2,
      borderColor: "white",
      borderRadius: 10,
      
      position: "relative",
      overflow: "hidden",

      justifyContent: "center",
      alignItems: "center",

    },

    bgPattern: {
      position: "absolute",
      top:0,
      left: 0,
    },

    cardText: {
      fontFamily: "QuickSandCustom",
      fontSize: 48,
      textAlign: "center",
      color: "#FFFFFF",
      width: "90%",
    },

  });
  // ------------------------------------------------------------------------------
  const placeCard = (data) => {
    return (
        <View style={styles.placeHolderCard}>
          <View style={styles.bgPattern}>
            <TruchetPattern
                width={500} 
                height={700} 
                color="#ff0044" 
                backgroundColor="#0d0d0d" 
                opacity={0.1}
            />
          </View>
          <Text style={styles.cardText}>
            {data.text}
          </Text>
        </View>
    );
  } 
  // ------------------------------------------------------------------------------
  return (
    <placeholderCards.Root
      data={cards}
      getKey={(card) => card.id}
      allowedDirections={["left", "right"]}
      visibleCardCount={3}
    >
      <placeholderCards.Card interactive>
        {({ item }) => {
          return placeCard(item);
        }}
      </placeholderCards.Card>
    </placeholderCards.Root>
  );
}
// ------------------------------------------------------------------------------
export default PlaceholderDeck;
