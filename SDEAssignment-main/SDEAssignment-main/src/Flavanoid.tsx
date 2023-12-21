import React, { useEffect, useState } from "react";
import "./styles.css";
import { calculateMean, calculateMedian, calculateMode } from "./utils/MMM";

const Flavanoid = () => {
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

  const classHeaders = [1, 2, 3]; // Class IDs as numbers
  const measureRows = [
    "Flavanoids Mean",
    "Flavanoids Median",
    "Flavanoids Mode",
  ];

  return (
    <div>
      <h2>Flavanoid Statistics</h2>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Measure</th>
            {classHeaders.map((header) => (
              <th key={header}>Class {header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {measureRows.map((rowHeader) => (
            <tr key={rowHeader}>
              <td>{rowHeader}</td>
              {classHeaders.map((classId) => (
                <td key={`${rowHeader}-${classId}`}>
                  {rowHeader === "Flavanoids Mean" && (
                    <div>
                      {calculateMean(
                        wineData.filter((item) => item.Alcohol === classId),
                        "Flavanoids"
                      )}
                    </div>
                  )}
                  {rowHeader === "Flavanoids Median" && (
                    <div>
                      {calculateMedian(
                        wineData.filter((item) => item.Alcohol === classId),
                        "Flavanoids"
                      )}
                    </div>
                  )}
                  {rowHeader === "Flavanoids Mode" && (
                    <div>
                      {calculateMode(
                        wineData.filter((item) => item.Alcohol === classId),
                        "Flavanoids"
                      )}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Flavanoid;
