import { StyleSheet, ScrollView } from "react-native";
import CardMapComponent from "./CardMapComponent";
import CardReviewComponent from "./CardReviewComponent.js";
import CardPhotosComponent from "./CardPhotosComponent";
import CardHeaderComponent from "./CardHeaderComponent.js";
import TruchetPattern from "../../assets/svg/TruchetPattern.jsx";

const Card = ({data, state}) => {
  const styles = StyleSheet.create({

    scrollContainer: {
      borderRadius: 15,
      borderWidth: 1,
      borderColor: state.cardBorderColor,
      alignSelf: "center",
      backgroundColor: state.cardBgColor,
      width: "80%",
      height: "80%",
      boxShadow: `0px 5px 15px ${state.cardShadowColor}`,
    },

    card: {
      alignItems: "center",
    },

  });

  // if (state.matchMade) return null;
  
  // ---------------------------------------------------------r--------------------
  return (
    <ScrollView 
      style={styles.scrollContainer}
      contentContainerStyle={styles.card}
    >
      <TruchetPattern 
        width={350}
        height={1000}
        color="#f900f1"
        backgroundColor="#011c2b"
        opacity={0.2}
      />

      {/*name of restaurant and price / overall rating*/}
      <CardHeaderComponent data={data} state={state}/>
      {/*horizontal scroll images of restaurant*/}
      <CardPhotosComponent data={data} state={state}/>
      {/*horizontal scroll of individual reviews*/}
      <CardReviewComponent data={data} state={state}/>
      {/*map of restaurant location*/}
      <CardMapComponent restaurant={data} state={state}/> 
    </ScrollView>
  );
};
// ------------------------------------------------------------------------------


export default Card;


// ------------------------------------------------------------------------------
// shape of data looking like :
// {
// "id": "ChIJcyHKrHGmIIYR2WCyZwWLEI0",
// "formattedAddress": "930 Tchoupitoulas St Ste A, New Orleans, LA 70130, USA",
// "rating": 4.6,
// "displayName": {
//   "text": "Cochon RESTAURANT",
//   "languageCode": "en"
// },
// "photos": [
//   {
// ------------------------------------------------------------------------------