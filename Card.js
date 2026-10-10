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
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.card}
      >
          {/*horizontal scroll images of restaurant*/}
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
          {/*name of restaurant and price / overall rating*/}
          <Text style={styles.itemName}>
            {data.displayName.text}
          </Text>

          <Text style={styles.priceLevel}>
            {priceLevel(data.priceLevel)}
          </Text>
      
          <StarRating 
            style={styles.stars}
            onChange={()=>{}}
            rating={data.rating}
            enableHalfStar={true}
            step="quarter"
            starSize={40}
            color={"#770737"}
          />
      
          {/*horizontal scroll of individual reviews*/}
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
                    color={"#770737"}
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
          {/*map of restaurant location*/}
          <RestaurantMap
            restaurant={data}
          />
      </ScrollView>
    );

};
// ------------------------------------------------------------------------------
// Color pallette helper
// https://paletton.com/#uid=55p0u0kllllaFw0g0qFqFg0w0aF
// ------------------------------------------------------------------------------
const styles = StyleSheet.create({
  scrollContainer: {

    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#c4bbc5',
    alignSelf: "center",
    backgroundColor: "#0a0909",
    width: "90%",
    maxHeight: "80%",

    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.8)",

  },

  card: {
    alignItems: "center",
  },

  photoListContainer :{
    height: 180,
    margin: 20,

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
    fontSize: 50,
    backgroundColor: 'transparent',
    color: "#EDEADE",
    fontFamily: "UnicaCustom",
  },

  priceRating:{
    flexDirection: "row",
    alignItems: "center",
    margin: 50,
  },
  priceLevel:{
    fontFamily:"UnicaCustom",
    fontSize: 40,
    color: "#FAA0A0"
  },
  stars:{
    margin: 10
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
    height: 380,
    margin: 20,

  },
  reviewsContent:{
    gap: 10,
  },
  reviewDate:{
    fontFamily: "QuickSandCustom",
    fontSize: 10,
    color: "#c4bbc5",
    padding: 5,
  },
  singleReviewContainer:{
    width: 200,
    height: 180,
    borderRadius: 10,
    backgroundColor: "#100f0f",
    padding: 10,
  },
  starsIndividualRatings:{
    padding: 5,
  },
  individualReviewText:{
    fontFamily: "QuickSandCustom",
    fontSize: 10,
    color: "#FFFFFF",
    maxWidth: 200,
    padding: 5,
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
