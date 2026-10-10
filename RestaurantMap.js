import { View, StyleSheet, Linking } from "react-native";
import MapView, { Marker } from "react-native-maps";
// ------------------------------------------------------------------------------
export const RestaurantMap = ({ restaurant }) => {

  return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          userInterfaceStyle="dark"
          scrollEnabled={true}
          zoomEnabled={true}
          rotateEnabled={true}
          pitchEnabled={true}
          initialRegion={{
            latitude: restaurant.location.latitude,
            longitude: restaurant.location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: restaurant.location.latitude,
              longitude: restaurant.location.longitude,
            }}
            title={restaurant.displayName.text}
            onPress={() => Linking.openURL(restaurant.googleMapsUri)}
          />
        </MapView>
      </View>
  );
};
// ------------------------------------------------------------------------------
const styles = StyleSheet.create({

  container: {
    width: "90%",
    height: 150,
    borderRadius: 15,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});