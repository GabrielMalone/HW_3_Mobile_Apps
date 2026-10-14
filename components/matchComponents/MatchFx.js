
import {  StyleSheet, Text, Pressable } from 'react-native';
import { Confetti } from 'react-native-fast-confetti';
import { clearLikesAndDislikes } from '../../helpers/firebaseDatabase';

const MatchFx = ({state, dispatch}) => {

    const styles = StyleSheet.create({
        matchFxContainer : {
            flex : 10,
            backgroundColor: "#705f5f73",
            borderRadius: 20,
            zIndex: 3,
            alignItems : "center",
            justifyContent: "center",
        },
        matchText : {
            fontFamily : "UnicaCustom",
            fontSize: 64,
            color : "#FFFFFF",
        },
    });

    // on date decided --> 
    // name of restaurnt / map / option to book / plan route / call // 
    // maybe just add to matched list?

    return (
        <Pressable
            onPress={ async () => {
                dispatch({type: "SET_MATCH_MADE", matchMade: false});
                await clearLikesAndDislikes(state.uid);
            }}
            style={styles.matchFxContainer}
        >
            <Text style={styles.matchText}>
                It's decided!
            </Text>
            <Confetti autoplay>
            <Confetti.Flake size={12} radius={6} />
                <Confetti.Flake width={8} height={14} />
                <Confetti.Flake width={8} height={14} radius={6.5} />
                <Confetti.Flake width={8} height={14} radius={4} />
                <Confetti.Flake size={18} shape="heart" />
                <Confetti.Flake size={18} shape="star" />
                <Confetti.Flake size={17} shape="flower" />
                <Confetti.Flake width={24} height={17} shape="streamer" />  
            </Confetti>
        </Pressable>
    );
}

export default MatchFx
