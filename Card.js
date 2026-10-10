import { StyleSheet, View, Text, Image, FlatList, ScrollView } from "react-native";
import StarRating from 'react-native-star-rating-widget';
import { RestaurantMap } from "./RestaurantMap";

const Card = ({data}) => {
    // ------------------------------------------------------------------------------
    const priceLevel = (level) => {
      switch(level){
        case "PRICE_LEVEL_INEXPENSIVE":  return "$";
        case "PRICE_LEVEL_MODERATE"   :  return "$$";
        case "PRICE_LEVEL_EXPENSIVE"  :  return "$$$";
        default :  return "";
      }
    }
    // ------------------------------------------------------------------------------
    const photo = data.photos[0].name;
    const key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
    const photoURL = 
      `https://places.googleapis.com/v1/${photo}/media?maxWidthPx=800&key=${key}`;
    // ------------------------------------------------------------------------------
    return (
      <View style={styles.card}>
        
        <FlatList 
          data={data.photos}
          horizontal={true}
          style={styles.photoListContainer}
          contentContainerStyle={styles.photoListContent}
          renderItem={({item})=>{
            const pic = item.name;
            const photoURL = 
              `https://places.googleapis.com/v1/${pic}/media?maxWidthPx=800&key=${key}`;
            return(
              <Image 
                source={{ uri: photoURL }}
                style={styles.cardImage}
              />
            );
          }}
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
            onChange={()=>{}}
            rating={data.rating}
            enableHalfStar={true}
            step="quarter"
            starSize={20}
            color={"#770737"}
          />

        </View>
        <FlatList 
          data={data.reviews}
          horizontal={true}
          style={styles.reviewsContainer}
          contentContainerStyle={styles.reviewsContent}
          renderItem={({item})=>{
            console.log(`item: ${JSON.stringify(item)}`);
            return(
              <View style={styles.singleReviewContainer}>
                <StarRating 
                  starContainerStyle={styles.starsIndividualRatings}
                  onChange={()=>{}}
                  rating={item.rating}
                  enableHalfStar={true}
                  step="quarter"
                  starSize={10}
                  color={"#EC646C"}
                />

                <Text style={styles.reviewDate}>
                  {item.relativePublishTimeDescription}
                </Text>

                <ScrollView>
                  <Text style={styles.individualReviewText}>
                    {item.text.text}
                  </Text>
                </ScrollView>

              </View>
            );
          }}
        />
  

        <RestaurantMap 
          restaurant={data}
        />

      </View>
    );

};
// ------------------------------------------------------------------------------
// Color pallette helper
// https://paletton.com/#uid=55p0u0kllllaFw0g0qFqFg0w0aF
// ------------------------------------------------------------------------------
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

    overflow: "hidden",
  },

  photoListContainer :{
    maxHeight: 180,
    marginBottom: 20,
  },
  photoListContent:{
    padding: 0,
    gap: 10,
  },
  cardImage:{
    width: 250,
    height: 180,
    borderRadius: 10,
  },


  itemName: {
    textAlign: 'center',
    fontSize: 30,
    backgroundColor: 'transparent',
    color: "#EDEADE",
    fontFamily: "UnicaCustom",
  },


  priceLevel:{
      fontFamily:"UnicaCustom",
      fontSize: 20,
      color: "#FAA0A0"
  },
  priceRating:{
    flexDirection: "row",
    alignItems: "center",
  },
  stars:{
    margin: 10
  },
  itemCategory:{
    color: "#EC646C",
    fontSize: 15,
  },


  reviewSummary : {
    fontFamily: "QuickSandCustom",
    fontSize: 12,
    textAlign: "center",
    color: "#FFFFF0",
    width: "90%",
    marginBottom: 20,
  },


  reviewsContainer :{
    maxHeight: 180,
    marginBottom: 20,
  },
  reviewsContent:{
    padding: 10,
    gap: 10,
  },
  reviewDate:{
    fontFamily: "QuickSandCustom",
    fontSize: 10,
    color: "#ffabea",
  },
  singleReviewContainer:{
    width: 200,
    height: 180,
    borderRadius: 10,
    backgroundColor: "#0f0f0f"
  },
  starsIndividualRatings:{

  },
  individualReviewText:{
    fontFamily: "QuickSandCustom",
    fontSize: 10,
    color: "#FFFFF0",
    maxWidth: 200
  },

});

export default Card;

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
