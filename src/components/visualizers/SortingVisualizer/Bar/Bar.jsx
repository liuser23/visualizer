import { hexColorToFloatColor, linearGradient } from "./BarColoring.js";
import "./Bar.css";

export default function Bar(props) {
  const maxBarHeight = 420,
    maxBarWidth = 1080;
  // RGB Values are Taken from UI Gradients - https://uigradients.com/#MegaTron
  const rgb1 = "C6FFDD";
  const rgb2 = "FBD786";
  const rgb3 = "F7797D";
  // Array Size Prop Necessary to Determine Gradient Position
  const totalBars = props.numBars;
  let stops = [
    hexColorToFloatColor(rgb1),
    hexColorToFloatColor(rgb2),
    hexColorToFloatColor(rgb3),
  ];
  let value = props.id / totalBars;
  let result = linearGradient(stops, value);

  let barColor = `rgb(${result[0]}, ${result[1]}, ${result[2]})`;

  if (props.red) {
    barColor = "red";
  } else if (props.yellow) {
    barColor = "yellow";
  } else if (props.blue) {
    barColor = "cyan";
  } else if (props.green) {
    barColor = "rgb(0, 255, 102)";
  }

  let minpx = 8,
    maxpx = 32;
  // clamp function
  let pxWidth = Math.min(Math.max(maxBarWidth / totalBars - 4, minpx), maxpx);

  let showValuesPxThreshold = 18;
  let showValues = pxWidth >= showValuesPxThreshold ? true : false;

  let tailwindClass = `outline outline-2 outline-gray-400 display:inline-block`;
  if (props.finished) {
    tailwindClass += " bar-finished shadow-sm";
  }
  return (
    <div
      className={`${tailwindClass}`}
      style={{
        width: `${pxWidth}px`,
        height: `${props.height * (maxBarHeight / (totalBars + 6))}px`,
        backgroundColor: `${barColor}`,
      }}
    >
      {showValues && props.height}
    </div>
  );
}
