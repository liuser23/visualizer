import { useEffect, useState } from "react";
import DisplayBars from "./DisplayBars.jsx";
import "./SortingVisualizer.css";
import {
  selectionSort,
  bubbleSort,
  insertionSort,
  mergeSort,
  quickSort,
} from "../../../algorithms/sorting-algos.js";

import { Dropdown } from "flowbite-react";
import { RangeSlider } from "flowbite-react";

export default function SortingVisualizer() {
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
  const [finished, setFinished] = useState(false);
  const [algoIndex, setAlgoIndex] = useState(-1);
  const algorithms = [selectionSort, bubbleSort, insertionSort, mergeSort, quickSort];

  const minArraySize = 8;
  const maxArraySize = 100;

  const totalTimes = {
    "Fast": 9000,
    "Medium": 16000,
    "Slow": 25000,
  };
  const currentTotalTime = totalTimes[animationSpeed];

  function fisherYatesShuffle(arr) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Initialize Array + Shuffle
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
  }, []);

  function sortingEffect() {
    if (finished) {
      alert("Array has already been sorted. Try a new sort! :)");
      return;
    }
    if (algoIndex === -1) {
      alert("Select an algorithm first!");
      return;
    }
    setRendering(true);
    const statesInOrder = algorithms[algoIndex](array);
    for (let i = 0; i < statesInOrder.length; i++) {
      const { arr: stateArray, colorBars: colorChanges } = statesInOrder[i];
      setTimeout(() => {
        // each (stateInOrder array element represents a 'frame' of the animation, these are played in order via setTimeout)
        setArray(stateArray);
        setColorBars(colorChanges);
      }, Math.floor(currentTotalTime / statesInOrder.length) * i);
    }
    setTimeout(() => {
      setRendering(false);
      setFinished(true);
    }, Math.floor(currentTotalTime / statesInOrder.length) * statesInOrder.length);
  }

  function sliderChangeArraySize() {
    let newSize = Number(document.getElementById("sm-range").value); //gets the oninput value
    setArraySize(newSize);
    resetArray();
  }

  function createDropdownLabel(algoIndex) {
    if (algoIndex === -1) {
      return "Select an Algorithm";
    }
    const descriptions = [
      "Selection Sort",
      "Bubble Sort",
      "Insertion Sort",
      "Merge Sort",
      "Quick Sort",
    ];
    return descriptions[algoIndex];
  }

  return (
    <div className="container mx-auto pt-3 mt-6 min-h-[520px] transition-opacity ease-in duration-700 opacity-100 fadeIn">
      <DisplayBars
        array={array}
        arraySize={arraySize}
        finished={finished}
        colorBars={colorBars}
      />
      <hr className="pt-3 border-t-2 mx-auto mt-3 border-gray-300"></hr>
      <div className="flex flex-row w-full justify-center align-middle gap-8 pt-3 pb-3">
        <button
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg drop-shadow-md 
          enabled:hover:bg-blue-700 disabled:opacity-50"
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
            <Dropdown.Item onClick={() => setAlgoIndex(0)}>Selection Sort</Dropdown.Item>
            <Dropdown.Item onClick={() => setAlgoIndex(1)}>Bubble Sort</Dropdown.Item>
            <Dropdown.Item onClick={() => setAlgoIndex(2)}>Insertion Sort</Dropdown.Item>
            <Dropdown.Item onClick={() => setAlgoIndex(3)}>Merge Sort</Dropdown.Item>
            <Dropdown.Item onClick={() => setAlgoIndex(4)}>Quick Sort</Dropdown.Item>
          </Dropdown>
        </div>

        <button
          className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg drop-shadow-md 
          enabled:hover:bg-gray-700 disabled:opacity-50"
          disabled={rendering}
          onClick={resetArray}
        >
          Reset
        </button>
        {/* <button
          className="py-2 px-4 bg-gray-100 hover:bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%
          text-white font-semibold rounded-lg drop-shadow-md 
          enabled:hover:bg-gray-700 focus:outline-none disabled:opacity-50"
          disabled={rendering}
        >
          Surprise!
        </button> */}
      </div>
    </div>
  );
}
