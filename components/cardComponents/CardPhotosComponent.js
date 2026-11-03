import { FlatList, Image, StyleSheet } from "react-native"
// ------------------------------------------------------------------------------
const CardPhotosComponent = ({data, state, mini=false}) => {

    const key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

    const styles = StyleSheet.create({
      photoListContainer :{
        height: !mini ? state.photoListHeight : 40,
        margin: 20,
      },
      photoListContent:{
        padding: 0,
        gap: !mini ? 10 : 1,
      },
      cardImage:{
        width: !mini ? state.cardImageWidth : 40,
        height: !mini ? state.cardImageHeight : 40,
        borderRadius: !mini ? 10 : 0,
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