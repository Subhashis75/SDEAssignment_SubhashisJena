import React, { useEffect, useState } from "react";
import "./styles.css";
import { calculateMean, calculateMedian, calculateMode } from "./utils/MMM";

// Function to calculate Gamma for each data point
const calculateGamma = (data: any[]): void => {
  data.forEach((item) => {
    const gamma =
      (parseFloat(item.Ash) * parseFloat(item.Hue)) /
      parseFloat(item.Magnesium);
    item.Gamma = gamma.toFixed(3); // Adding Gamma property to each data point, rounded to 3 decimal places
  });
};

// Function to calculate class-wise mean, median, mode of Gamma for the entire dataset
const calculateGammaStats = (
  data: any[],
  alcoholClass: number
): [number, number, number | undefined] => {
  const classData = data.filter((item) => item.Alcohol === alcoholClass);
  const gammaValues = classData.map((item) => parseFloat(item.Gamma));

  const mean = calculateMean(classData, "Gamma");

  const median = calculateMedian(classData, "Gamma");
  const mode = calculateMode(classData, "Gamma");

  return [mean, median, mode];
};

const Gamma = () => {
  const [wineData, setWineData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("data.json"); // Fetch data from public folder
        const jsonData = await response.json();
        setWineData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  calculateGamma(wineData);

  // Calculate class-wise stats for Gamma
  const classOneStats = calculateGammaStats(wineData, 1);
  const classTwoStats = calculateGammaStats(wineData, 2);
  const classThreeStats = calculateGammaStats(wineData, 3);

  return (
    <div>
      <h2>Gamma Statistics</h2>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Measure</th>
            <th>Class 1</th>
            <th>Class 2</th>
            <th>Class 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gamma Mean</td>
            <td>{classOneStats[0]}</td>
            <td>{classTwoStats[0]}</td>
            <td>{classThreeStats[0]}</td>
          </tr>
          <tr>
            <td>Gamma Median</td>
            <td>{classOneStats[1]}</td>
            <td>{classTwoStats[1]}</td>
            <td>{classThreeStats[1]}</td>
          </tr>
          <tr>
            <td>Gamma Mode</td>
            <td>{classOneStats[2]}</td>
            <td>{classTwoStats[2]}</td>
            <td>{classThreeStats[2]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Gamma;
