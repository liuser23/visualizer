// Calculations Adapted From - https://dev.to/ndesmic/linear-color-gradients-from-scratch-1a0e
function hexColorToFloatColor(hex) {
  return [
    parseInt(hex.substring(0, 2), 16),
    parseInt(hex.substring(2, 4), 16),
    parseInt(hex.substring(4, 6), 16),
  ];
}

function linearGradient(stops, value) {
  const stopLength = 1 / (stops.length - 1);
  const valueRatio = value / stopLength;
  const stopIndex = Math.floor(valueRatio);
  if (stopIndex === stops.length - 1) {
    return stops[stops.length - 1];
  }
  const stopFraction = valueRatio % 1;
  return lerp(stops[stopIndex], stops[stopIndex + 1], stopFraction);
}

function lerp(pointA, pointB, normalValue) {
  if (pointA === undefined || pointB === undefined) {
    return [0, 0, 0];
  }
  return [
    pointA[0] + (pointB[0] - pointA[0]) * normalValue,
    pointA[1] + (pointB[1] - pointA[1]) * normalValue,
    pointA[2] + (pointB[2] - pointA[2]) * normalValue,
  ];
}

export { hexColorToFloatColor, linearGradient };
