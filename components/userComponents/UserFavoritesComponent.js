import { View, StyleSheet, Text, FlatList } from "react-native";
import { useEffect, useMemo, useState } from "react";
import getRestaurantData from "../../helpers/getRestaurantData";
import MiniCard from "../cardComponents/MiniCard";
// --------------------------------------------------------------------------------
const UserFavoritesComponent = ({dispatch, state}) => {
     // ----------------------------------------------------------------------------
    // get the restaurant data so we can use like id's to get full info
    const [places, setPlaces] = useState([]);
    // load the data once on mounting the component
    useEffect(()=>{
        let active = true;
        const loadRestaurants = async () => {
            const data = await getRestaurantData(dispatch);
            if (active) setPlaces(data ?? []);
        }
        loadRestaurants();
        return () => {
            active = false;
        };
    },[]);
    // ----------------------------------------------------------------------------
    // from just the saved id's get the full restaurant data
    // ----------------------------------------------------------------------------
    const myLikedRestaurantData = useMemo(()=>{
        const likedIds = [...new Set(state?.liked ?? [])];
        return likedIds
            .map((id)=>places.find((restaurant)=>restaurant?.id === id))
            .filter(Boolean);
    },[places, state?.liked]);
    const styles = StyleSheet.create({
        userSettingsContainer : {

            flex: 1,
            width : "100%",
            backgroundColor: "#070707",
            alignSelf: "center",
            
            borderRadius: 10,

            alignItems: "center",

        },
        profileHeader:{
            fontFamily: "OpenCustom",
            fontSize: 24  ,
            color: "#FFFFFF",
            marginVertical: 10,
        },
        emptyText:{
            fontFamily: "OpenCustom",
            fontSize: 14,
            color: "dimgray",
            marginTop: 20,
        },

    });
    // maybe render them in a mini card style
    // will also need to keep like a separation 
    // between long-term favs and session favs
    return (
        <View style={styles.userSettingsContainer}>
            <Text style={styles.profileHeader}>
                Favorites
            </Text>
            <FlatList
                data={myLikedRestaurantData}
                keyExtractor={(item) => item.id}
                numColumns={3}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        No favorites yet
                    </Text>
                }
                renderItem={
                    ({item})=>{
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

