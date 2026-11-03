import { StyleSheet, ScrollView } from "react-native";
import CardMapComponent from "./CardMapComponent";
import CardReviewComponent from "./CardReviewComponent.js";
import CardPhotosComponent from "./CardPhotosComponent";
import CardHeaderComponent from "./CardHeaderComponent.js";
import TruchetPattern from "../../assets/svg/TruchetPattern.jsx";

const MiniCard = ({data, state}) => {

  const styles = StyleSheet.create({

    scrollContainer: {

      borderRadius: 15,
      borderWidth: 1,
      borderColor: "#ff009042",
      alignSelf: "center",
      backgroundColor: "#000000",
      width: "25%",
      height: 100,
      boxShadow: `0px 5px 15px #000000`,
      margin: 5,

    },

    card: {
      alignItems: "center",
    },

  });

  if (state.matchMade) return null;
  
  // ---------------------------------------------------------r--------------------
  return (
    <ScrollView 
      style={styles.scrollContainer}
      contentContainerStyle={styles.card}
    >
      <TruchetPattern 
        width={state.cardPatternBgWidth}
        height={state.cardPatternBgHeight}
        color={state.cardPatternBgColor}
        backgroundColor={state.cardPatternBgBgColor}
        opacity={state.cardPatternBgOpacity}
      />
      {/*name of restaurant and price / overall rating*/}
      <CardHeaderComponent data={data} state={state} mini={true}/>
      {/*horizontal scroll images of restaurant*/}
      <CardPhotosComponent data={data} state={state} mini={true}/>
    </ScrollView>
  );
};
// ------------------------------------------------------------------------------


export default MiniCard;


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