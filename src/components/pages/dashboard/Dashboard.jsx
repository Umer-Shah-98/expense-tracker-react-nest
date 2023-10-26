import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../layout/Layout";
import AmountCard from "../../amountCard/AmountCard";
import { Typography, Box, Grid } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import SchoolIcon from "@mui/icons-material/School";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import TransactionForm from "../../transactionForm/TransactionForm";
import { accountActions } from "../../../store/account-slice";
import axios from "axios";
import { toast } from "react-toastify";
import categorySlice, { categoryActions } from "../../../store/category-slice";
import { categoryIconMap } from "../../../constants/categoriesIconMap";
import AddCategoryForm from "../../addCategoryForm/AddCategoryForm";
import { transactionActions } from "../../../store/transaction-slice";
import TransactionsTable from "../../transactionTable/TransactionTable";
import RecentTransactionsTable from "../../recentTransactionsTable/RecentTransactionsTable";
import PaidIcon from "@mui/icons-material/Paid";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { getRandomColorAndIcon } from "../../../utils";
import { PieChart } from "../../chart/PieChart";
import IconOne from "../../../assets/cat-icon-1.png";
// import Example from "../../chart/PieChart";
// export const colorPairs = [
//   { cardColor: "#f5f5f5", iconWrapperColor: "#333" }, // Example light and dark colors
//   { cardColor: "#e0e0e0", iconWrapperColor: "#444" },
//   { cardColor: "#dcdcdc", iconWrapperColor: "#555" },
//   // Add more color pairs as needed
// ];

// // Define an array of possible icons for categories
// export const randomIcons = [
//   <AttachMoneyIcon fontSize="large" sx={{ color: "white" }} />,
//   <MonetizationOnIcon fontSize="large" sx={{ color: "white" }} />,
//   <PaidIcon fontSize="large" sx={{ color: "white" }} />,
//   <CurrencyExchangeIcon fontSize="large" sx={{ color: "white" }} />,
//   <ShoppingCartCheckoutIcon fontSize="large" sx={{ color: "white" }} />,
//   <AddShoppingCartIcon fontSize="large" sx={{ color: "white" }} />,
// ];

// export const getRandomColorAndIcon = () => {
//   const randomPair = colorPairs[Math.floor(Math.random() * colorPairs.length)];

//   // const randomIcon =
//   //   randomIcons[Math.floor(Math.random() * randomIcons.length)];
//   return { randomPair: randomPair };
// };

const Dashboard = () => {
  const user = useSelector((state) => state.auth.userData);
  const categories = useSelector((state) => state.category.categories);
  const transactions = useSelector((state) => state.transaction.transactions);
  const recentTransactions = useSelector(
    (state) => state.transaction.recentTransactions
  );
  const totalIncomeAmount = useSelector(
    (state) => state.transaction.totalIncomeAmount
  );
  const totalExpenseAmount = useSelector(
    (state) => state.transaction.totalExpenseAmount
  );
  const total = useSelector((state) => state.account.totalBalance);
  const data = [
    ["Task", "Hours per Day"],
    ["Incomes", totalIncomeAmount],
    ["Expenses", totalExpenseAmount],
    //   ["Commute", 2],
    //   ["Watch TV", 2],
    //   ["Sleep", 7],
  ];
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [categoriesNotFound, setCategoriesNotFound] = useState(false);

  const fetchAccounts = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/accounts/find_all/${id}`
      );
      const accounts = response.data;
      dispatch(accountActions.addAccount(accounts));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/categories/find_all/${id}`
      );
      const categories = response.data;
      const error = response?.data?.error;
      if (error) {
        console.log(error);
        throw error;
      } else {
        dispatch(categoryActions.addCategory(categories));
      }
    } catch (error) {
      setCategoriesNotFound(true);
      console.log(error);
    }
  };

  const fetchTransactions = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/transactions/find_all/${id}`
      );
      const data = response.data;
      const error = data.error;
      if (error) {
        throw error;
      } else {
        dispatch(transactionActions.addTransaction(data));
        return data;
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };
  const fetchRecentTransactions = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/transactions/recent/${id}`
      );
      const data = response.data;
      const error = data.error;
      if (error) {
        throw error;
      } else {
        dispatch(transactionActions.addRecentTransaction(data));
        return data;
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  useEffect(() => {
    const userData = user?.user;
    const userId = userData?.id;
    fetchAccounts(userId);
    fetchCategories(userId)
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error);
        setCategoriesNotFound(true);
      });
    fetchTransactions(userId);
    fetchRecentTransactions(userId);
  }, [user]);

  return (
    <>
      <Box className="wrapper flex flex-col items-center lg:flex-row lg:justify-between lg:items-start gap-2">
        <Box className="left">
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              color: "purple",
              fontFamily: "Poppins",
              fontSize: { xs: "16px", sm: "22px", md: "30px",},
            }}
          >
            Welcome {user?.user?.username}
          </Typography>
          <Box className="flex  justify-center sm:justify-start gap-5 sm:flex-row">
            <AmountCard
              iconWrapperColor="#990999a8"
              cardColor="#d5b1f0"
              heading="Total Amount"
              amount={total.toFixed(2)}
              cardIcon={
                <AccountBalanceWalletIcon
                  fontSize="large"
                  sx={{ color: "white" }}
                />
              }
            />

            <AmountCard
              iconWrapperColor="#078d07"
              cardColor="#0080006b"
              heading="You Earned"
              amount={totalIncomeAmount.toFixed(2)}
              cardIcon={<PaidIcon fontSize="large" sx={{ color: "white" }} />}
            />
            <AmountCard
              iconWrapperColor="#cb2020"
              cardColor="#ff000063"
              heading="You Spent"
              amount={totalExpenseAmount.toFixed(2)}
              cardIcon={
                <ShoppingCartIcon fontSize="large" sx={{ color: "white" }} />
              }
            />
          </Box>
          <Box className="mt-10">
            <TransactionForm></TransactionForm>
          </Box>
        </Box>
        <Box className="right">
          <Typography
            variant="h5"
            align="center"
            sx={{ mb: 2, fontFamily: "Poppins", color: "purple" }}
          >
            Your Recent Transactions
          </Typography>
          <RecentTransactionsTable transactions={recentTransactions} />
        </Box>
      </Box>

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
                sx={{ fontFamily: "Poppins", color: "red", m: 5 }}
              >
                No Categories Found
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
                        <CheckroomIcon
                          fontSize="large"
                          sx={{ color: "white" }}
                        />
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
                  expenseRatio = ((expenseAmount * 100) / totalAmount).toFixed(
                    2
                  );
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
                      // amount="2000"
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
        {(totalIncomeAmount > 0 || totalExpenseAmount > 0) && (
          <Box className="pie-chart w-full flex justify-center mt-10">
            <PieChart data={data}></PieChart>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Dashboard;
