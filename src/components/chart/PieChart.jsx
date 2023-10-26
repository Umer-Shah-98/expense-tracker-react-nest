// import React, { useState } from "react";
// import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

// const data = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 },
// ];

// const renderActiveShape = (props) => {
//   const RADIAN = Math.PI / 180;
//   const {
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//     startAngle,
//     endAngle,
//     fill,
//     payload,
//     percent,
//     value,
//   } = props;
//   const sin = Math.sin(-RADIAN * midAngle);
//   const cos = Math.cos(-RADIAN * midAngle);
//   const sx = cx + (outerRadius + 10) * cos;
//   const sy = cy + (outerRadius + 10) * sin;
//   const mx = cx + (outerRadius + 30) * cos;
//   const my = cy + (outerRadius + 30) * sin;
//   const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//   const ey = my;
//   const textAnchor = cos >= 0 ? "start" : "end";

//   return (
//     <g>
//       <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
//         {payload.name}
//       </text>
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//       />
//       <Sector
//         cx={cx}
//         cy={cy}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         innerRadius={outerRadius + 6}
//         outerRadius={outerRadius + 10}
//         fill={fill}
//       />
//       <path
//         d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
//         stroke={fill}
//         fill="none"
//       />
//       <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey}
//         textAnchor={textAnchor}
//         fill="#333"
//       >{`PV ${value}`}</text>
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey}
//         dy={18}
//         textAnchor={textAnchor}
//         fill="#999"
//       >
//         {`(Rate ${(percent * 100).toFixed(2)}%)`}
//       </text>
//     </g>
//   );
// };

// const Example = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const onPieEnter = (_, index) => {
//     setActiveIndex(index);
//   };

//   return (
//     <ResponsiveContainer width="100%" height="100%">
//         {/* <h1>Pie</h1> */}
//       <PieChart width={400} height={400}>
//         <Pie
//           activeIndex={activeIndex}
//           activeShape={renderActiveShape}
//           data={data}
//           cx="50%"
//           cy="50%"
//           innerRadius={60}
//           outerRadius={80}
//           fill="#8884d8"
//           dataKey="value"
//           onMouseEnter={onPieEnter}
//         />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// };

// export default Example;
// import React from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";
// import { Box } from "@mui/material";

// ChartJS.register(ArcElement, Tooltip, Legend);

// export const data = {
//   labels: ["Incomes", "Expenses"],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [200, 100],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(255, 206, 86, 0.2)",
//         "rgba(75, 192, 192, 0.2)",
//         "rgba(153, 102, 255, 0.2)",
//         "rgba(255, 159, 64, 0.2)",
//       ],
//       borderColor: [
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//         "rgba(75, 192, 192, 1)",
//         "rgba(153, 102, 255, 1)",
//         "rgba(255, 159, 64, 1)",
//       ],
//       borderWidth: 2,
//     },
//   ],
// };

// export function PieChart() {
//   return (
//     <>
//       <Box className="flex justify-center w-full">
//         <Doughnut
//           style={{ width: "200px", height: "200px", marginLeft: "800px" }}
//           data={data}
//         />
//         ;
//       </Box>
//     </>
//   );
// }import React from "react";
import { Box } from "@mui/material";
import { Chart } from "react-google-charts";
import './styles.module.css'
// export const data = [
//   ["Task", "Hours per Day"],
//   ["Incomes", 11],
//   ["Expenses", 2],
// //   ["Commute", 2],
// //   ["Watch TV", 2],
// //   ["Sleep", 7],
// ];

export const options = {
  title: "Track your Expenses",
  is3D: true,
  colors: ["#078d07", "#cb2020"],
  pieSliceTextStyle: {
    color: "black", // Change the text color of the label (not the percentage)
    fontFamily:'Poppins',
  },
  cssClassNames: {
    percentage: "percentage-text bold-text", // Apply the custom CSS class to percentage text
  },
//   pieSliceText: "label",
};

export function PieChart({ data }) {
  return (
    <Box className="w-3/4" sx={{ fontFamily: "Poppins" }}>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        style={{ height: "500px", fontFamily: "Poppins" }}
      />
    </Box>
  );
}
