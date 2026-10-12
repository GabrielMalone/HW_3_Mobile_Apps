import { Text, StyleSheet } from "react-native";
import StarRating from "react-native-star-rating-widget";
// ------------------------------------------------------------------------------
const CardHeaderComponent = ({data}) => {

  const priceLevel = (level) => {
    switch(level){
      case "PRICE_LEVEL_INEXPENSIVE":  return "$";
      case "PRICE_LEVEL_MODERATE"   :  return "$$";
      case "PRICE_LEVEL_EXPENSIVE"  :  return "$$$";
      default :  return "";
    }
  }
  return (
    <>

      <Text style={styles.itemName}>
          {data.displayName.text}
      </Text>

      { data.priceLevel ?   
        <Text style={styles.priceLevel}>
          {priceLevel(data.priceLevel)}
        </Text> 
        : null
      }

      <StarRating 
          style={styles.stars}
          onChange={()=>{}}
          rating={data.rating}
          enableHalfStar={true}
          step="quarter"
          starSize={40}
          color={"#770737"}
      />

    </>
  );
}
// ------------------------------------------------------------------------------
const styles = StyleSheet.create({
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
});
// ------------------------------------------------------------------------------
export default CardHeaderComponent