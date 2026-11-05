
import {  StyleSheet, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { Confetti } from 'react-native-fast-confetti';
import { clearLikesAndDislikes } from '../../helpers/firebaseDatabase';
import Card from '../cardComponents/Card';
import { getMatchedRestaurantObj } from '../../helpers/compareLikes';
// ------------------------------------------------------------------------------
const MatchFx = ({state, dispatch}) => {

    const [rObj, setRObj] = useState(null);

    useEffect(()=>{
        const restaurantObj = getMatchedRestaurantObj(state);
        setRObj(restaurantObj);
    },[state]);

    const styles = StyleSheet.create({
        matchFxContainer : {
            height: "100%",
            borderRadius: 0,
            zIndex: 10,
            alignItems : "center",
            position: "relative"
        },
        matchText : {
            fontFamily : "UnicaCustom",
            fontSize: 64,
            color : "#FFFFFF",
        },
        isoSphere : {
            zIndex: -1,
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
                dispatch({type: "RESET_LIKED"});
                await clearLikesAndDislikes(state.uid);
            }}
            style={styles.matchFxContainer}
        >
            {rObj && <Card data={rObj} state={state} />}
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
