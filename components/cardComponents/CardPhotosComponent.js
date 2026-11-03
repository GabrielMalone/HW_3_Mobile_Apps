import { FlatList, Image, StyleSheet } from "react-native"
// ------------------------------------------------------------------------------
const CardPhotosComponent = ({data, state, mini=false}) => {

    const key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

    const styles = StyleSheet.create({
      photoListContainer :{
        height: state.photoListHeight,
        margin: !mini ? 20 : 0,
      },
      photoListContent:{
        padding: 0,
        gap: !mini ? 10 : 3,
      },
      cardImage:{
        width: !mini ? state.cardImageWidth : 80,
        height: !mini ? state.cardImageHeight : 80,
        borderRadius: !mini ? 10 : 0,
      },    
    });

    return (
        <FlatList 
            data={data.photos}
            horizontal={!mini ? true : false}
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
    );
}
// ------------------------------------------------------------------------------
export default CardPhotosComponent