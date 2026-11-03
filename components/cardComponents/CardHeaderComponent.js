import { Text, StyleSheet } from "react-native";
import StarRating from "react-native-star-rating-widget";
// ------------------------------------------------------------------------------
const CardHeaderComponent = ({data, state, mini=false}) => {

  const styles = StyleSheet.create({
    itemName: {
      textAlign: 'center',
      fontSize: !mini ? state.cardTitleFontSize : 12,
      backgroundColor: 'transparent',
      color: state.cardTitleFontColor,
      fontFamily: state.cardTitleFontFace,
    },
    priceRating:{
      flexDirection: "row",
      alignItems: "center",
      margin: 50,
    },
    priceLevel:{
      fontFamily: state.cardPriceLevelFontFace,
      fontSize: !mini ? state.cardPriceLevelFontSize : 12,
      color: state.cardPriceLevelFontColor,
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
          starSize={!mini ? state.cardStarRatingSize : 12}
          color={state.cardStarRatingColor}
      />

    </>
  );
}
// ------------------------------------------------------------------------------

// ------------------------------------------------------------------------------
export default CardHeaderComponent