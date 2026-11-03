import { StyleSheet, ScrollView } from "react-native";
import CardPhotosComponent from "./CardPhotosComponent";
import CardHeaderComponent from "./CardHeaderComponent.js";
import TruchetPattern from "../../assets/svg/TruchetPattern.jsx";

const MiniCard = ({data, state}) => {

  const styles = StyleSheet.create({

    scrollContainer: {

      borderRadius: 15,
      borderWidth: 1,
      borderColor: "#616265",
      alignSelf: "center",
      width: 100,
      maxWidth: 100,
      height: 150,
      maxHeight : 150,
      boxShadow: `0px 5px 15px #000000`,
      margin: 3,
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
        width={100}
        height={300}
        color="#008c8a"
        backgroundColor="#011c2b"
        opacity={0.3}
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