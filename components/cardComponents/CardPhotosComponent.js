import { FlatList, Image, StyleSheet } from "react-native"
// ------------------------------------------------------------------------------
const CardPhotosComponent = ({data, state}) => {

    const key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

    const styles = StyleSheet.create({
      photoListContainer :{
        height: state.photoListHeight,
        margin: 20,
      },
      photoListContent:{
        padding: 0,
        gap: 10,
      },
      cardImage:{
        width: state.cardImageWidth,
        height: state.cardImageHeight,
        borderRadius: 10,
      },    
    });

    return (
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
    );
}
// ------------------------------------------------------------------------------
export default CardPhotosComponent