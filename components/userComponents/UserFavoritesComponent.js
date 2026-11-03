import { View, StyleSheet, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import getRestaurantData from "../../helpers/getRestaurantData";
import MiniCard from "../cardComponents/MiniCard";
// --------------------------------------------------------------------------------
const UserFavoritesComponent = ({dispatch, state}) => {
     // ----------------------------------------------------------------------------
    // get the restaurant data so we can use like id's to get full info
    const [myLikedRestaurantData, setMyLikedRestaurantData] = useState(null);
    // load the data once on mounting the component
    useEffect(()=>{
        const loadRestaurants = async () => {
            const places = await getRestaurantData(dispatch);
            let likes = state?.liked?.map(
                (id)=>{
                    let data = places.find(
                        restaurant=>restaurant.id === id
                    );
                    return data ? data : null;
                }); 
            setMyLikedRestaurantData(likes);
        }
        loadRestaurants();
    },[]);
    // ----------------------------------------------------------------------------
    // from just the saved id's get the full restaurant data
    // ----------------------------------------------------------------------------
    const styles = StyleSheet.create({
        userSettingsContainer : {

            position: "absolute",
            top: 110,

            width : "100%",
            height: "69%",
            backgroundColor: "#0f0f0f",
            alignSelf: "center",
      
            alignItems: "center",
            zIndex : 10,

        },
        profileHeader:{
            fontFamily: "OpenCustom",
            fontSize: 24  ,
            color: "#FFFFFF",
            marginVertical: 10,
        },

    });
    // maybe render them in a mini card style
    // will also need to keep like a separation 
    // between long-term favs and session favs
    return (
        <View style={styles.userSettingsContainer}>
            <FlatList
                data={myLikedRestaurantData}
                keyExtractor={(item) => item.id}
                numColumns={3}
                renderItem={
                    ({item})=>{
                        console.log(item);
                        return (
                            <MiniCard data={item} state={state}/>
                        );
                    }
                }
            >
            </FlatList>
        </View>
    );
}
// --------------------------------------------------------------------------------
export default UserFavoritesComponent;

