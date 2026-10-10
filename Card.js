import { StyleSheet, View, Text } from "react-native";

const Card = ({restaurantName}) => {

    console.log(restaurantName);

    return (
      <View style={styles.card}>
        <View style={styles.cardImage}>
        </View>
        <Text style={styles.itemName}>
          {restaurantName}
        </Text>
        <Text style={[styles.itemName, styles.itemCategory]}>
          {restaurantName}
        </Text>
      </View>
    );

};

// Color pallette helper
//https://paletton.com/#uid=55p0u0kllllaFw0g0qFqFg0w0aF

const styles = StyleSheet.create({
  card: {
    flex: 0.7,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#64242F',
    justifyContent: 'flex-start',
    alignSelf: "center",
    backgroundColor: "#1B1B1B",
    marginTop: 0,
    width: "90%",

    shadowColor: "#000",
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 10,

  },
  cardImage:{
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#64242F",
    width: "95%",
    height: "50%",
  },
  itemName: {
    textAlign: 'center',
    fontSize: 30,
    backgroundColor: 'transparent',
    color: "#F36363",
    fontFamily: "UnicaCustom",
  },
  itemCategory:{
    color: "#EC646C",
    fontSize: 15,
  },
});

export default Card;