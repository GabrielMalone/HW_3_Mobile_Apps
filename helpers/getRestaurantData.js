// https://developers.google.com/maps/documentation/places/web-service/nearby-search
// import restaurantData from '../data/googlePlacesCache.json'
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { File, Paths } from "expo-file-system";
import googlePlacesCache from "../data/googlePlacesCache.json"

// ------------------------------------------------------------------------------
const defaultSearchRadius = 5000;

const distanceInMeters = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371000;
    const toRadians = (degrees) => degrees * Math.PI / 180;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2
        + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * earthRadius * Math.asin(Math.sqrt(a));
};

const withinRadius = (places, lat, lon, radius) => {
    if (!radius) return places;
    return places?.filter((place) => {
        if (!place?.location) return false;
        return distanceInMeters(
            lat,
            lon,
            place.location.latitude,
            place.location.longitude
        ) <= radius;
    });
};
// ------------------------------------------------------------------------------
const getRestaurantData = async (dispatch, radius) => {

    const user_lat = 29.951065;
    const user_lon = -90.071533;

    // if cached let's not waste api $$$
    // will need to modify this in the future to clear cache
    //  on new location settings/stale time
    const cached = await AsyncStorage.getItem("googlePlacesCache");

    // if (cached) {
    //     const file = new File(Paths.document, "googlePlacesCache.json");
    //     file.write(cached);
    //     console.log("Saved cache to:", file.uri);
    //     console.log("Using cached Google Places data:", JSON.parse(cached));
    //     dispatch({type: "SET_LOCAL_RESTAURANT_DATA", localRestaurantData: JSON.parse(cached).places});
    //     return JSON.parse(cached).places;   
    // }

    if (googlePlacesCache) {
        console.log("Using project cached Google Places data:", googlePlacesCache?.places);
        dispatch({type: "SET_LOCAL_RESTAURANT_DATA", localRestaurantData: googlePlacesCache?.places});


        return withinRadius(googlePlacesCache?.places, user_lat, user_lon, radius);
    }

    const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
    // settings
    const placeTypes = ["restaurant"];
    // max is 20
    const numPlacesToFind = 20;
    // 5k radius (3.1miles)
    const searchRadius = radius ?? defaultSearchRadius;
    // what do I want to get back
    const fieldMask = [
        "places.id",
        "places.location",
        "places.googleMapsUri",
        "places.displayName",
        "places.formattedAddress",
        "places.rating",
        "places.reviews",
        // "places.photos", // god damn expensive
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
    console.error("NOT USING cached Google Places data:", data);
    dispatch({type: "SET_LOCAL_RESTAURANT_DATA", localRestaurantData: data.places});
    return data.places;
}

export default getRestaurantData;