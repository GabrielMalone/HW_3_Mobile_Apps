import { FlatList, StyleSheet, View, ScrollView, Text } from "react-native";
import StarRating from "react-native-star-rating-widget";
// ------------------------------------------------------------------------------
const CardReviewComponent = ({data, state}) => {
  const styles = StyleSheet.create({
      reviewSummary : {
          fontFamily: "QuickSandCustom",
          fontSize: 12,
          textAlign: "center",
          color: state.reviewSummaryTextColor,
          width: "90%",
          marginBottom: 20,
      },
      
      reviewsContainer :{
          margin: 20,
          opacity: 0.8,

      },
      reviewsContent:{
          gap: 10,
      },
      reviewDate:{
          fontFamily: state.reviewDateFontFamily,
          fontSize: state.reviewDateFontSize,
          color: state.reviewDateFontColor,
          padding: 5,
      },
      singleReviewContainer:{
          width: state.reviewContainerWidth,
          height: state.reviewContainerHeight,
          borderRadius: 10,
          backgroundColor: state.reviewContainerBgColor,
          padding: 10,
      },
      starsIndividualRatings:{
          padding: 5,
      },
      individualReviewText:{
          fontFamily: state.individualReviewTextFace,
          fontSize: state.individualReviewTextSize,
          color: state.individualReviewTextColor,
          maxWidth: 200,
          padding: 5,
      },  
  });
    return (
        <FlatList 
            data={data.reviews}
            horizontal={true}
            style={styles.reviewsContainer}
            contentContainerStyle={styles.reviewsContent}
            renderItem={({item})=>{
              // console.log(`item: ${JSON.stringify(item)}`);
              return(
                <View style={styles.singleReviewContainer}>
                  <StarRating 
                    starContainerStyle={styles.starsIndividualRatings}
                    onChange={()=>{}}
                    rating={item.rating}
                    enableHalfStar={true}
                    step="quarter"
                    starSize={state.invidualReviewStarsSize}
                    color={state.invidualReviewStarsColor}
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
    );
}
// ------------------------------------------------------------------------------

// ------------------------------------------------------------------------------
export default CardReviewComponent