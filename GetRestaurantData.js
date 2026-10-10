// https://developers.google.com/maps/documentation/places/web-service/

import * as Location from "expo-location";


const GetRestaurantData = async () => {

    const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

    // settings
    const placeTypes = ["restaurant"];
    const numPlacesToFind = 20;
    // 5k radius (3.1miles)
    const searchRadius = 5000;
    const fieldMask = [
        "places.id",
        "places.displayName",
        "places.formattedAddress",
        "places.rating",
        "places.photos",
        "places.priceRange"
    ].join(",");

    // get user location
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        console.log("Location permission denied");
        return;
    }
    
    const location = await Location.getCurrentPositionAsync({});
    const lat = location.coords.latitude;
    const lon = location.coords.longitude;

    // get the data from google
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
                latitude: lat,
                longitude: lon
            },
            radius: searchRadius
            }
        }
        })
    }
    );

    const data = await response.json();

    // lettuce sea if it worked
    if (!response.ok) {
        console.error("Google Places API Error:", data);
        return;
    }
    console.log(data.places);

}

export default GetRestaurantData;