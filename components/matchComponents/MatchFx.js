
import {  StyleSheet, Text, Pressable } from 'react-native';
import { Confetti } from 'react-native-fast-confetti';
import { clearLikesAndDislikes } from '../../helpers/firebaseDatabase';
import IsoSphere from '../../assets/svg/IsoSphere';

const MatchFx = ({state, dispatch}) => {

    const styles = StyleSheet.create({
        matchFxContainer : {
            flex : 10,

            borderRadius: 20,
            zIndex: 3,
            alignItems : "center",
            justifyContent: "center",
            position: "relative"
        },
        matchText : {
            fontFamily : "UnicaCustom",
            fontSize: 64,
            color : "#FFFFFF",
        },
        isoSphere : {
            zIndex: 0,
            position: "absolute"
        }
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
            <IsoSphere
                style={styles.isoSphere}
                width={600}
                height={600}
                lightColor = "#c50ce168"
                darkColor = "#26bb8022"
            />
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
