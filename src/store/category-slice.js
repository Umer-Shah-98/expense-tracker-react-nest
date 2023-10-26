import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { dispatch } from "./index.js";
const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
  },
  reducers: {
    addCategory(state, action) {
      const categories = action.payload;
      state.categories = categories;
    },
    updateCategoryAmount(state, action) {
      const category = action.payload;
      const { categoryId, type, amount } = category;

      // Find the index of the category in the state array
      const categoryIndex = state.categories.findIndex(
        (cat) => cat._id === categoryId
      );

      if (categoryIndex !== -1) {
        // Create a copy of the category to update it immutably
        const updatedCategory = { ...state.categories[categoryIndex] };

        // Update the category's amount based on the type
        if (type === "INCOME") {
          updatedCategory.incomeAmount += amount;
        } else if (type === "EXPENSE") {
          updatedCategory.expenseAmount += amount;
        }

        // Create a new state object with the updated category
        const updatedCategories = [...state.categories];
        updatedCategories[categoryIndex] = updatedCategory;

        // Update the state with the new categories array
        state.categories = updatedCategories;
      }
    },
    updateCategory(state, action) {
      const newCategory = action.payload;
      state.categories.push(newCategory);
    },
    deleteCategory(state, action) {
      state.categories = [];
    },
  },
});

export const categoryActions = categorySlice.actions;
export default categorySlice;

//fetching categories from database
export const fetchCategories = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/categories/find_all/${id}`
    );
    const categories = response.data;
    const error = response?.data?.error;
    if (error) {
      throw error;
    } else {
      dispatch(categoryActions.addCategory(categories));
      return { success: true, data: categories };
    }
  } catch (error) {
    return { success: false, error: error };
    // setCategoriesNotFound(true);
    // console.log(error);
  }
};

//adding category to database

export const addCategory = async (categoryData) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/categories/create`,
      categoryData
    );
    const { data } = response;
    const error = data?.error;
    if (error) {
      throw error;
    } else {
      console.log(data);
      dispatch(categoryActions.updateCategory(data));
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error };
  }
};
