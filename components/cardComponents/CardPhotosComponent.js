import { FlatList, Image, StyleSheet } from "react-native"
// ------------------------------------------------------------------------------
const CardPhotosComponent = ({data}) => {

    const key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

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
const styles = StyleSheet.create({
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
});
// ------------------------------------------------------------------------------
export default CardPhotosComponent