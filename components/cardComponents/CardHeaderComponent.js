import { Text, StyleSheet } from "react-native";
import StarRating from "react-native-star-rating-widget";
// ------------------------------------------------------------------------------
const CardHeaderComponent = ({data, state, mini=false}) => {

  const styles = StyleSheet.create({
    itemName: {

      textAlign: 'center',
      fontSize: !mini ? state.cardTitleFontSize : 16,
      backgroundColor: 'transparent',
      color: state.cardTitleFontColor,
      fontFamily: state.cardTitleFontFace,
      margin : mini ?  20 : 20,
    },
    priceRating:{
      flexDirection: "row",
      alignItems: "center",
    },
    priceLevel:{
      fontFamily: state.cardPriceLevelFontFace,
      fontSize: !mini ? state.cardPriceLevelFontSize : 16,
      color: !mini ? "#00ffcc" : "#00ffcc",
    },
    stars:{
      margin: 10
    },
  });

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
          {data.displayName?.text}
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
          starSize={!mini ? state.cardStarRatingSize : 12}
          color={!mini ? "#FFFFFF" : "#00ffe5"}
      />
    </>
  );
}
// ------------------------------------------------------------------------------

// ------------------------------------------------------------------------------
export default CardHeaderComponent