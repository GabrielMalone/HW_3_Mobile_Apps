import { StyleSheet, View, Text } from "react-native";

export const renderCard = (card) => {

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
    borderColor: '#E498AF',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#BE5F7C",
    marginTop: 0,
  },
  cardImage:{
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#E498AF",
    width: "95%",
    height: "50%",
  },
  itemName: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
    color: "#E498AF",
    fontFamily: "NotoCustom",
  },
});