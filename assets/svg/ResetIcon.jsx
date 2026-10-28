import Svg, { Path } from 'react-native-svg';

export default function ResetIcon({ size = 32, color = 'black' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <Path d="M0 0h32v32H0z" fill="none" />
      <Path
        d="M18 28A12 12 0 1 0 6 16v6.2l-3.6-3.6L1 20l6 6l6-6l-1.4-1.4L8 22.2V16a10 10 0 1 1 10 10Z"
        fill={color}
      />
    </Svg>
  );
}