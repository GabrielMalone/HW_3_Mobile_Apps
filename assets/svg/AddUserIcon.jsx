import Svg, { Path, G, Circle } from "react-native-svg";

export default function AddUserIcon({ size = 24, color = "black" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {/* Empty rectangle */}
      <Path d="M0 0h24v24H0z" fill="none" />

      <G fill="none" stroke={color} strokeWidth={2}>
        <Circle cx={12} cy={7} r={5} />

        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 22H5.266a2 2 0 0 1-1.985-2.248l.39-3.124A3 3 0 0 1 6.649 14H7m12 0v4m-2-2h4"
        />
      </G>
    </Svg>
  );
}