// https://developers.google.com/maps/documentation/places/web-service/nearby-search

import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
// ------------------------------------------------------------------------------
const getRestaurantData = async () => {

    // if cached let's not waste api $$$
    // will need to modify this in the future to clear cache
    //  on new location settings/stale time
    const cached = await AsyncStorage.getItem("googlePlacesCache");

    if (cached){
        // console.log("Using cached Google Places data:", JSON.parse(cached));
        return JSON.parse(cached).places;       
    }

    const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
    // settings
    const placeTypes = ["restaurant"];
    // max is 20
    const numPlacesToFind = 20;
    // 5k radius (3.1miles)
    const searchRadius = 5000;
    // what do I want to get back
    const fieldMask = [
        "places.id",
        "places.location",
        "places.googleMapsUri",
        "places.displayName",
        "places.formattedAddress",
        "places.rating",
        "places.reviews",
        "places.photos",
        "places.priceRange",
        "places.priceLevel",
        "places.reviewSummary"
    ].join(",");
    // ------------------------------------------------------------------------------
    // get user location
    // ------------------------------------------------------------------------------
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        console.log("Location permission denied");
        return;
    }
    // ------------------------------------------------------------------------------
    // virtual phone needs to have location set for this to work
    // New Orleans Lat and Long:
    //  29.951065
    // -90.071533
    // ------------------------------------------------------------------------------
    // const location = await Location.getCurrentPositionAsync({});
    // const user_lat = location.coords.latitude;
    // const user_lon = location.coords.longitude;
    const user_lat = 29.951065;
    const user_lon = -90.071533;
    // ------------------------------------------------------------------------------
    // get the data from google
    // ------------------------------------------------------------------------------
    const response = await fetch(
    "https://places.googleapis.com/v1/places:searchNearby",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_API_KEY,
            "X-Goog-FieldMask": fieldMask
        },
        body: JSON.stringify({
            includedTypes: placeTypes,
            maxResultCount: numPlacesToFind,
            locationRestriction: {
                circle: {
                    center: {
                        latitude: user_lat,
                        longitude: user_lon
                    },
                    radius: searchRadius
                }
            }
        })
    });
    // ------------------------------------------------------------------------------
    // this returns an object
    // with places key whose value is an array
    // {places:[]}
    // ------------------------------------------------------------------------------
    const data = await response.json();
    // lettuce sea if it worked
    if (!response.ok) {
        console.error("Google Places API Error:", data);
        return;
    }
    await AsyncStorage.setItem("googlePlacesCache", JSON.stringify(data));
    // ------------------------------------------------------------------------------
    console.log("NOT USING cached Google Places data:", data);
    return data.places;
}

export default getRestaurantData;