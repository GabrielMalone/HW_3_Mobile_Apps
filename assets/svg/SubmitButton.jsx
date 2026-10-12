import { Pressable, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const SubmitButton = ({ onPress, width = 100, height = 100, color = "#00d9ff" }) => {


    const styles = StyleSheet.create({
        
        button: {
            borderColor: color,
            justifyContent: "center",
            alignItems: "center",
        },
    });

    return (
        <Pressable
            style={styles.button}
            onPress={onPress}
        >
            <Svg
                width={width}
                height={height}
                viewBox="0 0 15 16"
            >
                <Path
                    d="M12.49 7.14L3.44 2.27c-.76-.41-1.64.3-1.4 1.13l1.24 4.34q.075.27 0 .54l-1.24 4.34c-.24.83.64 1.54 1.4 1.13l9.05-4.87a.98.98 0 0 0 0-1.72Z"
                    fill={color}
                />
            </Svg>
        </Pressable>
    );
};


export default SubmitButton;