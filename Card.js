import { StyleSheet, View, Text } from "react-native";
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

    return (
      <View style={styles.card}>
        <View style={styles.cardImage}>
        </View>
        <Text style={styles.itemName}>
          {data.displayName.text}
        </Text>
        <StarRating 
          style={styles.stars}
          rating={data.rating}
          enableHalfStar={true}
          step="quarter"
          starSize={20}
          color={"#EC646C"}
        />
 
      </View>
    );

};

// Color pallette helper
//https://paletton.com/#uid=55p0u0kllllaFw0g0qFqFg0w0aF

const styles = StyleSheet.create({
  card: {
    flex: 0.7,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#64242F',
    justifyContent: 'flex-start',
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#1B1B1B",
    marginTop: 0,
    width: "90%",

    shadowColor: "#000",
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 10,

  },
  cardImage:{
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#64242F",
    width: "95%",
    height: "50%",
  },
  itemName: {
    textAlign: 'center',
    fontSize: 30,
    backgroundColor: 'transparent',
    color: "#F36363",
    fontFamily: "UnicaCustom",
  },
  itemCategory:{
    color: "#EC646C",
    fontSize: 15,
  },
  stars:{
    
  },
});

export default Card;