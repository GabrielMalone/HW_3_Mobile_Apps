// https://developers.google.com/maps/documentation/places/web-service/


// Use places.displayName to access the text name of the place.
// places.currentOpeningHours
// places.priceRange
// places.rating
// places.photos
// places.reviews

// Find places of one type

// The following example shows a Nearby Search (New) request for the display names of all restaurants within a 500-meter radius, defined by circle:

// curl -X POST -d '{
//   "includedTypes": ["restaurant"],
//   "maxResultCount": 10,
//   "locationRestriction": {
//     "circle": {
//       "center": {
//         "latitude": 37.7937,
//         "longitude": -122.3965},
//       "radius": 500.0
//     }
//   }
// }' \
// -H 'Content-Type: application/json' -H "X-Goog-Api-Key: API_KEY" \
// ---> add more types with comma seperation ---> -H "X-Goog-FieldMask: places.displayName" \
// https://places.googleapis.com/v1/places:searchNearby

const GetRestaurantData = async () => {

    const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

    const response = await fetch(
    "https://places.googleapis.com/v1/places:searchNearby",
    {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_API_KEY,
        "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.rating, places.photos, places.reviews, places.priceRange"
        },
        body: JSON.stringify({
        includedTypes: ["restaurant"],
        maxResultCount: 20,
        locationRestriction: {
            circle: {
            center: {
                latitude: 30.4515,
                longitude: -91.1871
            },
            radius: 5000
            }
        }
        })
    }
    );

    const data = await response.json();

    console.log(data.places);


}