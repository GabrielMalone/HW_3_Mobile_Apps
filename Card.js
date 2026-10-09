import { StyleSheet, View, Text } from "react-native";

export const Card = (card) => {

    return (
      <View style={styles.card}>
        <View style={styles.cardImage}></View>
        <Text style={styles.itemName}>{card.text}</Text>
      </View>
    );

};

// Color pallette helper
//https://paletton.com/#uid=55p0u0kllllaFw0g0qFqFg0w0aF

const styles = StyleSheet.create({
  card: {
    flex: 0.7,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#1D1816',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#2A2A2A",
    marginTop: 0,

    shadowColor: "#000",
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 10,

  },
  cardImage:{
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#1D1816",
    width: "95%",
    height: "50%",
  },
  itemName: {
    margin: 10,
    textAlign: 'center',
    fontSize: 30,
    backgroundColor: 'transparent',
    color: "#F36363",
    fontFamily: "UnicaCustom",
  },
});