import { StyleSheet, View, Text, Image } from "react-native";
import StarRating from 'react-native-star-rating-widget';

const Card = ({data}) => {

    // console.log(JSON.stringify(data, null, 2));

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

    const priceLevel = (level) => {
      switch(level){
        case "PRICE_LEVEL_INEXPENSIVE":  return "$";
        case "PRICE_LEVEL_MODERATE"   :  return "$$";
        case "PRICE_LEVEL_EXPENSIVE"  :  return "$$$";
        default :  return "";
      }
    }

    const photo = data.photos[0].name;
    const key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
    const photoURL = `https://places.googleapis.com/v1/${photo}/media?maxWidthPx=800&key=${key}`;

    return (
      <View style={styles.card}>
        <Image 
          source={{ uri: photoURL }}
          style={styles.cardImage}
        />
        
        <Text style={styles.itemName}>
          {data.displayName.text}
        </Text>

        <View style={styles.priceRating}>

          <Text style={styles.priceLevel}>
            {priceLevel(data.priceLevel)}
          </Text>

          <StarRating 
            style={styles.stars}
            rating={data.rating}
            enableHalfStar={true}
            step="quarter"
            starSize={20}
            color={"#770737"}
          />

        </View>

        <Text style={styles.reviewSummary}>
          {data.reviewSummary?.text.text}
        </Text>


      </View>
    );

};

// Color pallette helper
//https://paletton.com/#uid=55p0u0kllllaFw0g0qFqFg0w0aF

const styles = StyleSheet.create({
  card: {
    flex: 0.8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#100013',
    justifyContent: 'flex-start',
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#0b0b0b",
    marginTop: 0,
    width: "90%",

    shadowColor: "#000",
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 10,

    overflow: "scroll",

  },
  cardImage:{
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#100013",
    width: "95%",
    height: "50%",
  },
  itemName: {
    textAlign: 'center',
    fontSize: 30,
    backgroundColor: 'transparent',
    color: "#EDEADE",
    fontFamily: "UnicaCustom",
  },
  priceRating:{
    flexDirection: "row",
    alignItems: "center",
  },
    itemCategory:{
      color: "#EC646C",
      fontSize: 15,
    },
    stars:{
      margin: 10
    },
  reviewSummary : {
    fontFamily: "QuickSandCustom",
    fontSize: 10,
    textAlign: "center",
    color: "#FFFFF0",
    width: "90%",
    marginBottom: 20,
  },
  priceLevel:{
      fontFamily:"UnicaCustom",
      fontSize: 20,
      color: "#DFFF00"
  },
});

export default Card;