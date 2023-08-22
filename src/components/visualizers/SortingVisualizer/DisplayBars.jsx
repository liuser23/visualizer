import Bar from "./Bar/Bar.jsx";

export default function DisplayBars(props) {
  // search in colorBars to see if bar is set to a certain color (for animation purposes)
  function checkBarColor(color, index) {
    if (props.colorBars[color] === undefined || props.colorBars[color].length === 0) {
      return false;
    }
    return props.colorBars[color].indexOf(index) >= 0;
  }

  return (
    <div className="flex flex-row justify-center gap-[1px] items-end h-[420px]">
      {props.array.map((value, index) => (
        <Bar
          height={value}
          key={index}
          id={value - 5}
          numBars={props.arraySize}
          red={checkBarColor("red", index)}
          green={checkBarColor("green", index)}
          yellow={checkBarColor("yellow", index)}
          blue={checkBarColor("blue", index)}
          finished={props.finished}
        />
      ))}
    </div>
  );
}
