import React, { useState } from "react";
import { Typography, Box, FormControl, TextField } from "@mui/material";
import { textFields } from "../../styles";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { categoryActions } from "../../store/category-slice";
import { addCategory } from "../../store/category-slice";
const AddCategoryForm = () => {
  const user = useSelector((state) => state.auth.userData);
  const userData = user?.user;
  const userId = userData?.id;
  const dispatch = useDispatch();
  const [categoryDetails, setCategoryDetails] = useState({
    categoryName: "",
    userId: userId,
    totalAmount: 0,
    incomeAmount: 0,
    expenseAmount: 0,
  });
  const [loader, setLoader] = useState(false);
  const [isCategoryValid, setIsCategoryValid] = useState(true);
  const [categoryHelperText, setCategoryHelperText] = useState("");
  const handleChange = (e) => {
    // const { name, value } = e.target;
    setCategoryDetails(() => {
      return {
        ...categoryDetails,
        [e.target.name]: e.target.value,
      };
    });
    console.log(categoryDetails);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    console.log(categoryDetails);
    const { categoryName } = categoryDetails;
    if (
      categoryName === undefined ||
      categoryName === "" ||
      categoryName.length < 3
    ) {
      setIsCategoryValid(false);
      setCategoryHelperText("Category Name must be at least three characters");
    } else {
      const categoryNameFormatted =
        categoryName.slice(0, 1).toUpperCase() +
        categoryName.slice(1).toLocaleLowerCase();
      setIsCategoryValid(true);
      setCategoryHelperText("");
      try {
        setLoader(true);
        const categoryData = {
          ...categoryDetails,
          categoryName: categoryNameFormatted,
        };
        const newCategory = await addCategory(categoryData);
        if (!newCategory.success) {
          throw Error(newCategory.error);
        } else {
          toast.success(`Category is added successfully`);
          setLoader(false);
          setCategoryDetails({
            ...categoryDetails,
            categoryName: "",
          });
        }
      } catch (error) {
        setLoader(false);
        toast.error(`${error}`);
      }
    }
  };
  return (
    <>
      <Box
        sx={{
          width: { lg: "400px" },
          height: { md: "250px" },
          borderRadius: "10px",
        }}
        className="bg-gray-300"
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontFamily: "Poppins",
            fontWeight: "medium",
            mt: 2,
            color: "purple",
          }}
        >
          Add Category
        </Typography>
        <Box component="form" sx={{ m: 5 }} onSubmit={handleSubmit}>
          <Box className="flex justify-around items-center md:flex-col">
            <FormControl>
              <TextField
                margin="normal"
                required
                size="small"
                type="text"
                fullWidth
                //   onBlur={handleBlur}
                onChange={handleChange}
                value={categoryDetails.categoryName}
                //  sx={styles.textFields}
                id="categoryName"
                label="Type Category Name"
                name="categoryName"
                autoComplete="categoryName"
                // autoFocus
                error={!isCategoryValid}
                helperText={categoryHelperText}
                InputLabelProps={{
                  sx: {
                    fontSize: "10px",
                    fontFamily: "Poppins",
                    color: "purple", // Change label color on focus
                    outlineColor: "purple",
                    "&.Mui-focused": {
                      color: "purple", // Change label color on focus
                    },
                  },
                }}
                sx={textFields}
              />{" "}
              {/* <FormHelperText>With label + helper text</FormHelperText> */}
            </FormControl>
            <Box
              sx={{ display: "flex", justifyContent: { md: "center" }, mt: 2 }}
            >
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loader}
                sx={{
                  fontSize: "10px",
                  // mb: 2,
                  py: 2,
                  fontWeight: "bold",
                  width: { xs: "120px" },
                  backgroundColor: "rgb(209,213,219)",
                  color: "purple",
                  "&:hover": {
                    backgroundColor: "purple",
                    color: "white",
                  },
                  borderCollapse: "collapse",
                }}
              >
                Add Category
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddCategoryForm;
