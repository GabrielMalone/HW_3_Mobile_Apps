
import { View, StyleSheet } from 'react-native';
import { Confetti } from 'react-native-fast-confetti';

const MatchFx = ({state}) => {

    const styles = StyleSheet.create({
        matchFxContainer : {
            flex : 1,
            top: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 3
        }
    });

    return (
        <View style={styles.matchFxContainer}>
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
        </View>
    );
}

export default MatchFx
