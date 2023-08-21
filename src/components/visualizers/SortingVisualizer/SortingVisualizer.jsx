import { useEffect, useState, useRef } from "react";
import Bar from "./Bar/Bar.jsx";
import {
  selectionSort,
  bubbleSort,
  insertionSort,
  mergeSort,
  quickSort,
} from "../../../algorithms/sorting-algos.js";

import { Dropdown } from "flowbite-react";
import { Label, RangeSlider } from "flowbite-react";

export default function SortingVisualizer() {
  const timerRef = useRef();
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(30);
  const [rendering, setRendering] = useState(false);
  const [animationSpeed, setSpeed] = useState("Medium");
  const [colorBars, setColorBars] = useState({
    red: [],
    green: [],
    yellow: [],
    blue: [],
  });
  const [pivot, setPivot] = useState();
  const [finished, setFinished] = useState(false);
  const [algoIndex, setAlgoIndex] = useState(0);
  const errorFunction = function () {
    alert("error");
  };
  const algorithms = [
    errorFunction,
    selectionSort,
    bubbleSort,
    insertionSort,
    mergeSort,
    quickSort,
  ];

  const minArraySize = 10;
  const maxArraySize = 50;

  const delayTimes = {
    "Fast": [15, 20, 20, 40, 40],
    "Medium": [15, 40, 40, 80, 80],
    "Slow": [60, 80, 80, 160, 160],
  };
  const currentDelayTime = delayTimes[animationSpeed];
  // console.log(currentDelayTime);

  // Initialize Array + Shuffle
  function fisherYatesShuffle(arr) {
    for (let i = arraySize - 1; i > 0; i -= 1) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function resetArray() {
    const arr = [];
    for (let i = 0; i < arraySize + 1; i++) {
      arr.push(i + 5);
    }
    setFinished(false);
    setArray(fisherYatesShuffle(arr));
  }

  useEffect(() => {
    resetArray();
  }, [arraySize]);

  // To-Do: First Make it Work for Selection Sort (Extrapolate to Other Sorts)
  function sortingEffect() {
    // trigger pop-up (array already sorted/reset)
    if (finished || algoIndex === 0) return;
    setRendering(true);
    const statesInOrder = algorithms[algoIndex](array);

    for (let i = 0; i < statesInOrder.length; i++) {
      // stateArray is the alias, arr/colorBars must match algo
      const { arr: stateArray, colorBars: colorChanges, pivot: pivot } = statesInOrder[i];
      setTimeout(() => {
        // each (state in order represents a 'frame' of the animation, these are played in order using setTimeout
        setArray(stateArray);
        setColorBars(colorChanges);
      }, currentDelayTime[0] * i);
    }
    setTimeout(() => {
      setRendering(false);
      // setFinished => play finished animation?
      setFinished(true);
      console.log(rendering);
    }, currentDelayTime[0] * statesInOrder.length);
  }

  // search in colorBars to see if this bar should be set a certain color
  function checkBarColor(color, index) {
    if (colorBars[color] === undefined || colorBars[color].length === 0) {
      return false;
    }
    return colorBars[color].indexOf(index) >= 0;
  }

  function createDropdownLabel(algoIndex) {
    const descriptions = [
      "Select an Algorithm",
      "Selection Sort",
      "Bubble Sort",
      "Insertion Sort",
      "Merge Sort",
      "Quick Sort",
    ];
    return descriptions[algoIndex];
  }

  function sliderChangeArraySize() {
    let val = document.getElementById("sm-range").value; //gets the oninput value
    console.log(val);
  }

  return (
    <div className="container mx-auto outline outline-red-100 pt-3">
      <div className="flex flex-row justify-center gap-[1px] items-end">
        {array.map((value, index) => (
          <Bar
            height={value}
            key={index}
            id={value - 5}
            numBars={arraySize}
            red={checkBarColor("red", index)}
            green={checkBarColor("green", index)}
            yellow={checkBarColor("yellow", index)}
            blue={checkBarColor("blue", index)}
            finished={finished}
          />
        ))}
      </div>
      <hr className="pt-3  mx-auto border 1px"></hr>
      <div className="flex flex-row w-full justify-center align-middle gap-8 pt-3 pb-3">
        <button
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg drop-shadow-md 
          enabled:hover:bg-blue-700 focus:outline-none disabled:opacity-50"
          disabled={rendering}
          onClick={sortingEffect}
        >
          Start
        </button>
        <div className="flex-column align-middle">
          <p className="font-semibold">Array Size</p>
          <RangeSlider
            disabled={rendering}
            id="sm-range"
            sizing="sm"
            onChange={sliderChangeArraySize}
            defaultValue={30}
            min={minArraySize}
            max={maxArraySize}
          />
        </div>

        <div className="drop-shadow-md ">
          <Dropdown className="shadow-md" disabled={rendering} label={animationSpeed}>
            <Dropdown.Item onClick={() => setSpeed("Slow")}>Slow</Dropdown.Item>
            <Dropdown.Item onClick={() => setSpeed("Medium")}>Medium</Dropdown.Item>
            <Dropdown.Item onClick={() => setSpeed("Fast")}>Fast</Dropdown.Item>
          </Dropdown>
        </div>

        <div className="drop-shadow-md ">
          <Dropdown
            className="shadow-md"
            disabled={rendering}
            label={createDropdownLabel(algoIndex)}
          >
            <Dropdown.Item onClick={() => setAlgoIndex(1)}>Selection Sort</Dropdown.Item>
            <Dropdown.Item onClick={() => setAlgoIndex(2)}>Bubble Sort</Dropdown.Item>
            <Dropdown.Item onClick={() => setAlgoIndex(3)}>Insertion Sort</Dropdown.Item>
            <Dropdown.Item onClick={() => setAlgoIndex(4)}>Merge Sort</Dropdown.Item>
            <Dropdown.Item onClick={() => setAlgoIndex(5)}>Quick Sort</Dropdown.Item>
          </Dropdown>
        </div>

        <button
          className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg drop-shadow-md 
          enabled:hover:bg-gray-700 focus:outline-none disabled:opacity-50"
          disabled={rendering}
          onClick={resetArray}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
