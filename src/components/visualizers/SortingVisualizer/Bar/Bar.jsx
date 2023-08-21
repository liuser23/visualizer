import { hexColorToFloatColor, linearGradient } from "./BarColoring.js";
import "../Bar/Bar.css";

export default function Bar(props) {
  //  These RGB Values are Taken from UI Gradients - https://uigradients.com/#MegaTron
  const rgb1 = "C6FFDD";
  const rgb2 = "FBD786";
  const rgb3 = "F7797D";
  // Prop Necessary to Determine Gradient Position
  const totalBars = props.numBars;

  let stops = [
    hexColorToFloatColor(rgb1),
    hexColorToFloatColor(rgb2),
    hexColorToFloatColor(rgb3),
  ];

  let value = props.id / totalBars;

  let result = linearGradient(stops, value);

  let finalColor = `rgb(${result[0]}, ${result[1]}, ${result[2]})`;

  if (props.red) {
    finalColor = "red";
  } else if (props.yellow) {
    finalColor = "yellow";
  } else if (props.blue) {
    finalColor = "cyan";
  } else if (props.green) {
    finalColor = "rgb(0, 255, 102)";
  }
  // Perform Transition When Finished
  if (props.finished) {
    return (
      <div
        className="min-w-4 w-6 outline outline-gray-300 outline-2 display:inline-block bar-finished"
        style={{
          height: `${props.height * 12}px`,
          backgroundColor: `${finalColor}`,
        }}
      >
        {props.height}
      </div>
    );
  } else {
    return (
      <div
        className="min-w-4 w-6 outline outline-2 outline-gray-300 display:inline-block"
        style={{
          height: `${props.height * 12}px`,
          backgroundColor: `${finalColor}`,
        }}
      >
        {props.height}
      </div>
    );
  }
}
