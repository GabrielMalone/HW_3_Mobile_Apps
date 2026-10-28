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
      borderWidth: !state.userSettingsVisible ? 1 : 0,
      borderColor: !state.userSettingsVisible ? state.cardBorderColor : "#00000000",
      alignSelf: "center",
      backgroundColor: state.cardBgColor,
      width: !state.userSettingsVisible ? "80%" : 0,
      height: !state.userSettingsVisible ? "80%" : 0,
      boxShadow: !state.userSettingsVisible ?  `0px 5px 15px ${state.cardShadowColor}` : null,
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
      {/*horizontal scroll images of restaurant*/}
      <CardPhotosComponent data={data} state={state}/>
      {/*name of restaurant and price / overall rating*/}
      <CardHeaderComponent data={data} state={state}/>
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