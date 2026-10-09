import { StyleSheet, View, Text } from "react-native";

export const Card = (card) => {

    return (
      <View style={styles.card}>
        <View style={styles.cardImage}>
        </View>
        <Text style={styles.itemName}>
          {card.text}
        </Text>
        <Text style={[styles.itemName, styles.itemCategory]}>
          {card.text}
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
    alignItems: 'center',
    backgroundColor: "#2A2A2A",
    marginTop: 0,

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