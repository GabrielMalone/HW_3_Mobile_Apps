import { FlatList, StyleSheet, View, ScrollView, Text } from "react-native";
import StarRating from "react-native-star-rating-widget";
// ------------------------------------------------------------------------------
const CardReviewComponent = ({data}) => {

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
    );
}
// ------------------------------------------------------------------------------
const styles = StyleSheet.create({
    reviewSummary : {
        fontFamily: "QuickSandCustom",
        fontSize: 12,
        textAlign: "center",
        color: "#FFFFF0",
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
// ------------------------------------------------------------------------------
export default CardReviewComponent