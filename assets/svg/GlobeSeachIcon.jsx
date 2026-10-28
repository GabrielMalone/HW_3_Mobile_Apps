import Svg, { Path } from "react-native-svg";

export default function GlobeSearchIcon({ size = 24, color = "black" }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path
                d="M0 0h24v24H0z"
                fill="none"
            />
            <Path
                fill={color}
                d="M12 22.22A10.22 10.22 0 1 1 22.22 12c0 2.3-.55 4.12-1.81 5.48l-1.63-2.34l-3.29.73l-1.12 2.91s2.24 2.37 1.62 2.63q-1.86.8-3.99.81"
                opacity={0.2}
            />
            <Path
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M22.3 12a10.3 10.3 0 1 0-11.23 10.27"
            />
            <Path
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16.37 12c0-5.7-1.96-10.3-4.37-10.3S7.63 6.3 7.63 12c0 4.77 1.56 9.03 3.42 10.2M1.7 12h20.6m-2.36 8.64l1.8 1.8m-.94-4.18a3.06 3.06 0 0 1-3.06 3.07a3.07 3.07 0 1 1 3.07-3.07"
            />
        </Svg>
    );
}