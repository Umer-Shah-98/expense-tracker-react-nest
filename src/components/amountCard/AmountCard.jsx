import { Box, CardMedia, Typography } from "@mui/material";
import React from "react";
const AmountCard = ({
  cardColor,
  iconWrapperColor,
  amount,
  heading,
  cardIcon,
  isCategoryCard = false,
  totalAmount,
  incomeRatio,
  expenseRatio,
  isRandomIcon = false,
  catRandomIcon,
}) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: cardColor,
          maxWidth: "250px",
          width: {
            xs: "150px",
            sm: "175px",
            md: "200px",
            lg: "225px",
            xl: "250px",
          },
          // width:'100%',
          height: { xs: "100px" },
        }}
        //
        className="amount-card-container flex justify-center rounded-2xl"
      >
        <Box className="amount-card-inner flex justify-around gap-3 sm:gap-4 md:gap-5 items-center mx-2 sm:mx-1">
          <Box
            className="icon-wrapper"
            sx={{
              width: { xs: "50px" },
              height: { xs: "50px" },
              backgroundColor: iconWrapperColor,
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {cardIcon}
            {isRandomIcon && <img src={catRandomIcon} />}
          </Box>
          <Box className="flex flex-col">
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Poppins",
                fontSize: { xs: "12px", md: "16px" },
                textAlign: { xs: "center" },
              }}
            >
              {heading}
            </Typography>
            {isCategoryCard ? (
              <>
                <Typography
                  // variant="subtitle1"
                  align="center"
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: "medium",
                    fontSize: { xs: "8px", md: "14px" },
                  }}
                >
                  Total Rs. {totalAmount}
                </Typography>
                <Typography
                  align="center"
                  sx={{
                    fontSize: "12px",
                    fontFamily: "Poppins",
                    fontWeight: "medium",
                  }}
                >
                  Income :{" "}
                  <span className="text-green-800 font-bold">
                    {incomeRatio}%
                  </span>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontFamily: "Poppins",
                    fontWeight: "medium",
                  }}
                >
                  Expense :{" "}
                  <span className="text-red-600 font-bold">
                    {expenseRatio}%
                  </span>
                </Typography>
              </>
            ) : (
              <Typography
                variant="h6"
                align="center"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: { xs: "12px", md: "16px" },
                }}
              >
                Rs. {amount}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AmountCard;
