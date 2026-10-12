import { StyleSheet, ScrollView } from "react-native";
import CardMapComponent from "./CardMapComponent";
import CardReviewComponent from "./CardReviewComponent.js";
import CardPhotosComponent from "./CardPhotosComponent";
import CardHeaderComponent from "./CardHeaderComponent.js";
import TruchetPattern from "../../assets/svg/TruchetPattern.jsx";

const Card = ({data}) => {
    // ------------------------------------------------------------------------------
    return (
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.card}
      >
        <TruchetPattern 
          width="100%"
          height={500}
          color="#f800be"
          backgroundColor="#0a0909"
          opacity={0.2}
        />
        {/*horizontal scroll images of restaurant*/}
        <CardPhotosComponent data={data}/>
        {/*name of restaurant and price / overall rating*/}
        <CardHeaderComponent data={data}/>
        {/*horizontal scroll of individual reviews*/}
        <CardReviewComponent data={data}/>
        {/*map of restaurant location*/}
        <CardMapComponent restaurant={data}/>
      </ScrollView>
    );
};
// ------------------------------------------------------------------------------
const styles = StyleSheet.create({
  
  scrollContainer: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#c4bbc5',
    alignSelf: "center",
    backgroundColor: "#0a0909",
    width: "90%",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.8)",
  },

  card: {
    alignItems: "center",
  },

});

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