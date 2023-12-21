export const calculateMean = (data: any[], property: string): number => {
  const sum = data.reduce((acc, curr) => acc + parseFloat(curr[property]), 0);
  const mean = sum / data.length;
  return parseFloat(mean.toFixed(3)); // Round to 3 decimal places
};

// Function to calculate the median
export const calculateMedian = (data: any[], property: string): number => {
  const sorted = data
    .map((item) => parseFloat(item[property]))
    .sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  let median;
  if (sorted.length % 2 === 0) {
    median = (sorted[middle - 1] + sorted[middle]) / 2;
  } else {
    median = sorted[middle];
  }

  return parseFloat(median.toFixed(3)); // Round to 3 decimal places
};

// Function to calculate the mode
export const calculateMode = (
  data: any[],
  property: string
): number | undefined => {
  const frequencyCounter: { [key: string]: number } = {};
  data.forEach((item) => {
    const value = parseFloat(item[property]);
    frequencyCounter[value] = (frequencyCounter[value] || 0) + 1;
  });

  let maxFrequency = 0;
  let mode: number | undefined;

  for (const key in frequencyCounter) {
    if (frequencyCounter[key] > maxFrequency) {
      maxFrequency = frequencyCounter[key];
      mode = parseFloat(key);
    }
  }

  return mode !== undefined ? parseFloat(mode.toFixed(3)) : undefined; // Round to 3 decimal places or return undefined
};
