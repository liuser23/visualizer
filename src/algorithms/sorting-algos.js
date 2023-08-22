function swap(arr, a, b) {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function selectionSort(arr) {
  let statesInOrder = [];
  let temp;
  for (let i = 0; i < arr.length - 1; i++) {
    let minId = i;
    for (let j = i + 1; j < arr.length; j++) {
      // candidate min is red, seek is blue
      temp = { arr: arr.slice(), colorBars: { red: [minId], blue: [j] } };
      statesInOrder.push(temp);
      // candidate changes
      if (arr[j] < arr[minId]) {
        minId = j;
        temp = { arr: arr.slice(), colorBars: { red: [minId] } };
        statesInOrder.push(temp);
        statesInOrder.push(temp);
      }
    }
    // turn both green (swap occur)
    if (minId !== i) {
      temp = { arr: arr.slice(), colorBars: { green: [minId, i] } };
      statesInOrder.push(temp);
      statesInOrder.push(temp);
      statesInOrder.push(temp);
      swap(arr, minId, i);
      temp = { arr: arr.slice(), colorBars: {} };
      statesInOrder.push(temp);
      statesInOrder.push(temp);
      statesInOrder.push(temp);
    }
  }
  temp = { arr: arr.slice(), colorBars: {} };
  statesInOrder.push(temp);
  return statesInOrder;
}

function bubbleSort(arr) {
  let statesInOrder = [];
  let temp;
  let n = arr.length;
  while (n > 1) {
    let newN = 0;
    for (let i = 1; i < n; i++) {
      temp = { arr: arr.slice(), colorBars: { green: [i, i - 1] } };
      statesInOrder.push(temp);
      statesInOrder.push(temp);
      if (arr[i - 1] > arr[i]) {
        swap(arr, i - 1, i);
        temp = { arr: arr.slice(), colorBars: { green: [i, i - 1] } };
        statesInOrder.push(temp);
        statesInOrder.push(temp);
        newN = i;
      }
    }
    n = newN;
  }
  temp = { arr: arr.slice(), colorBars: {} };
  statesInOrder.push(temp);
  return statesInOrder;
}

function insertionSort(arr) {
  let statesInOrder = [];
  let temp;
  for (let i = 1; i < arr.length; i++) {
    temp = { arr: arr.slice(), colorBars: { red: [i] } };
    statesInOrder.push(temp);
    statesInOrder.push(temp);
    let lastSwap;
    for (let j = i; j > 0 && arr[j - 1] > arr[j]; j--) {
      temp = { arr: arr.slice(), colorBars: { red: [j], yellow: [j - 1] } };
      statesInOrder.push(temp);
      swap(arr, j, j - 1);
      temp = { arr: arr.slice(), colorBars: { red: [j - 1] } };
      statesInOrder.push(temp);
      lastSwap = j - 1;
    }
    temp = { arr: arr.slice(), colorBars: { green: [lastSwap] } };
    statesInOrder.push(temp);
    statesInOrder.push(temp);
  }
  temp = { arr: arr.slice(), colorBars: {} };
  statesInOrder.push(temp);
  return statesInOrder;
}

// based off timo bingmann visualization - https://www.youtube.com/watch?v=ZRPoEKHXTJg (volume warning)
function mergeSort(arr) {
  let statesInOrder = [];
  mergeSortHelper(arr, 0, arr.length - 1, statesInOrder);
  const temp = {
    arr: arr.slice(),
    colorBars: {},
  };
  statesInOrder.push(temp);
  return statesInOrder;
}

function mergeSortHelper(arr, start, end, statesInOrder) {
  if (start === end) return;
  const mid = Math.floor((start + end) / 2);
  mergeSortHelper(arr, start, mid, statesInOrder);
  mergeSortHelper(arr, mid + 1, end, statesInOrder);
  merge(arr, start, mid, end, statesInOrder);
}

function merge(arr, start, mid, end, statesInOrder) {
  let k = start,
    i = start,
    j = mid + 1;
  let arrC = arr.slice();
  let temp;
  let i2 = i,
    j2 = j;
  while (i2 <= mid && j2 <= end) {
    temp = {
      arr: arr.slice(),
      colorBars: { red: [i2], blue: [mid + 1], yellow: [start, end] },
    };
    statesInOrder.push(temp);
    i2++;
    temp = {
      arr: arr.slice(),
      colorBars: { red: [j2], blue: [mid + 1], yellow: [start, end] },
    };
    statesInOrder.push(temp);
    j2++;
  }
  while (i2 <= mid) {
    temp = {
      arr: arr.slice(),
      colorBars: { red: [i2], blue: [mid + 1], yellow: [start, end] },
    };
    statesInOrder.push(temp);
    i2++;
  }
  while (j2 <= end) {
    temp = {
      arr: arr.slice(),
      colorBars: { red: [j2], blue: [mid + 1], yellow: [start, end] },
    };
    statesInOrder.push(temp);
    j2++;
  }

  while (i <= mid && j <= end) {
    if (arrC[i] <= arrC[j]) {
      arr[k] = arrC[i++];
      temp = {
        arr: arr.slice(),
        colorBars: { red: [k], yellow: [start, end] },
      };
      statesInOrder.push(temp);
      k++;
    } else {
      arr[k] = arrC[j++];
      temp = {
        arr: arr.slice(),
        colorBars: { red: [k], yellow: [start, end] },
      };
      statesInOrder.push(temp);
      k++;
    }
  }
  while (i <= mid) {
    arr[k] = arrC[i++];
    temp = {
      arr: arr.slice(),
      colorBars: { red: [k], yellow: [start, end] },
    };
    statesInOrder.push(temp);
    k++;
  }
  while (j <= end) {
    arr[k] = arrC[j++];
    temp = {
      arr: arr.slice(),
      colorBars: { red: [k], yellow: [start, end] },
    };
    statesInOrder.push(temp);
    k++;
  }
}

// based off timo bingmann visualization - https://www.youtube.com/watch?v=8hEyhs3OV1w (volume warning)
function quickSort(arr) {
  let statesInOrder = [];
  quickSortHelper(arr, 0, arr.length - 1, statesInOrder);
  const temp = { arr: arr.slice(), colorBars: {} };
  statesInOrder.push(temp);
  return statesInOrder;
}

function quickSortHelper(arr, left, right, statesInOrder) {
  let index;
  if (arr.length > 1) {
    index = partition(arr, left, right, statesInOrder); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      quickSortHelper(arr, left, index - 1, statesInOrder);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      quickSortHelper(arr, index, right, statesInOrder);
    }
  }
}

function partition(arr, left, right, statesInOrder) {
  let pivot = arr[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  while (i <= j) {
    let temp = { arr: arr.slice(), colorBars: { red: [i, j], yellow: [pivot] } };
    statesInOrder.push(temp);
    while (arr[i] < pivot) {
      i++;
      let temp = { arr: arr.slice(), colorBars: { red: [i, j], yellow: [pivot] } };
      statesInOrder.push(temp);
    }
    while (arr[j] > pivot) {
      j--;
      let temp = { arr: arr.slice(), colorBars: { red: [i, j], yellow: [pivot] } };
      statesInOrder.push(temp);
    }
    if (i <= j) {
      temp = { arr: arr.slice(), colorBars: { green: [i, j], yellow: [pivot] } };
      statesInOrder.push(temp);
      swap(arr, i, j); //sawpping two elements
      temp = { arr: arr.slice(), colorBars: { green: [i, j], yellow: [pivot] } };
      statesInOrder.push(temp);
      i++;
      j--;
    }
  }
  return i;
}

export { selectionSort, bubbleSort, insertionSort, mergeSort, quickSort };
