import React, { useState } from "react";
import { Typography, Box, Grid } from "@mui/material";
import { getRandomColorAndIcon } from "../../utils";
import { categoryIconMap } from "../../constants/categoriesIconMap";
import AddCategoryForm from "../addCategoryForm/AddCategoryForm";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import SchoolIcon from "@mui/icons-material/School";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import AmountCard from "../amountCard/AmountCard";
const Categories = ({ categories }) => {
  const [loading, setLoading] = useState(false);
  const [categoriesNotFound, setCategoriesNotFound] = useState(false);

  return (
    <Box className="mt-3">
      <Box className="m-5">
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Poppins",
            fontWeight: "medium",
            color: "purple",
          }}
        >
          Your Categories
        </Typography>
      </Box>
      <Box className="flex gap-6 lg:gap-3 flex-col lg:flex-row justify-center">
        <Grid container spacing={3}>
          {loading ? (
            <Grid item xs={12}>
              <Typography variant="h3" sx={{ fontFamily: "Poppins" }}>
                Loading...
              </Typography>
            </Grid>
          ) : categoriesNotFound ? (
            <Typography
              variant="h5"
              sx={{ fontFamily: "Poppins", color: "red", m: 5 }}
            >
              No Categories Found
            </Typography>
          ) : categories.length === 0 ? (
            <Typography
              variant="h5"
              sx={{ fontFamily: "Poppins", color: "black", m: 5 }}
            >
              Loading....
            </Typography>
          ) : (
            categories.map((category, index) => {
              let icon,
                cardColor,
                iconWrapperColor,
                catRandomIcon,
                isRandomIcon;
              if (categoryIconMap.hasOwnProperty(category?.categoryName)) {
                const {
                  icon: iconComponentName,
                  cardColor: predefinedCardColor,
                  iconWrapperColor: predefinedIconWrapperColor,
                } = categoryIconMap[category.categoryName];
                switch (iconComponentName) {
                  case "RestaurantMenuIcon":
                    icon = (
                      <RestaurantMenuIcon
                        fontSize="large"
                        sx={{ color: "white" }}
                      />
                    );
                    break;
                  case "HealthAndSafetyIcon":
                    icon = (
                      <HealthAndSafetyIcon
                        fontSize="large"
                        sx={{ color: "white" }}
                      />
                    );
                    break;
                  case "SchoolIcon":
                    icon = (
                      <SchoolIcon fontSize="large" sx={{ color: "white" }} />
                    );
                    break;
                  case "SportsEsportsIcon":
                    icon = (
                      <SportsEsportsIcon
                        fontSize="large"
                        sx={{ color: "white" }}
                      />
                    );
                    break;
                  case "CheckroomIcon":
                    icon = (
                      <CheckroomIcon fontSize="large" sx={{ color: "white" }} />
                    );
                    break;
                  default:
                    icon = (
                      <PaidIcon fontSize="large" sx={{ color: "white" }} />
                    );
                }
                cardColor = predefinedCardColor;
                iconWrapperColor = predefinedIconWrapperColor;
              } else {
                let { randomPair, randomIcon } = getRandomColorAndIcon();
                isRandomIcon = true;
                catRandomIcon = randomIcon;
                iconWrapperColor = randomPair.iconWrapperColor;
                cardColor = randomPair.cardColor;
              }
              let totalAmount;
              let incomeRatio;
              let expenseRatio;
              const incomeAmount = category.incomeAmount;
              const expenseAmount = category.expenseAmount;
              totalAmount = incomeAmount + expenseAmount;
              let totalAmountRounded = totalAmount.toFixed(2);
              if (totalAmount > 0) {
                incomeRatio = ((incomeAmount * 100) / totalAmount).toFixed(2);
                expenseRatio = ((expenseAmount * 100) / totalAmount).toFixed(2);
              } else {
                incomeRatio = 0;
                expenseRatio = 0;
              }
              return (
                <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                  <AmountCard
                    iconWrapperColor={iconWrapperColor}
                    cardColor={cardColor}
                    heading={category.categoryName}
                    isCategoryCard={true}
                    totalAmount={totalAmountRounded}
                    incomeRatio={incomeRatio}
                    expenseRatio={expenseRatio}
                    cardIcon={icon}
                    isRandomIcon={isRandomIcon}
                    catRandomIcon={catRandomIcon}
                  />
                </Grid>
              );
            })
          )}
        </Grid>
        <AddCategoryForm></AddCategoryForm>
      </Box>
    </Box>
  );
};

export default Categories;
