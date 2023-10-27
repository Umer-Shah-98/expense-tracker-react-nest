import { Box } from "@mui/material";
import { Chart } from "react-google-charts";
import "./styles.module.css";

export const options = {
  title: "Track your Expenses",
  is3D: true,
  colors: ["#078d07", "#cb2020"],
  pieSliceTextStyle: {
    color: "black", // Change the text color of the label (not the percentage)
    fontFamily: "Poppins",
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
